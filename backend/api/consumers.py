from asgiref.sync import async_to_sync
from channels.generic.websocket import AsyncWebsocketConsumer
import json
from api.views import alias_set, encrypted_map

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = 'chat_%s' % self.room_name
        # print(alias_set)
        # print(encrypted_map)
        
        # Join room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        await self.accept()
        active = list(alias_set)
        await self.send(text_data=json.dumps({
            'active':active,
            'type':'--online--',
        }))


    async def disconnect(self, close_code):
        user = encrypted_map[self.current]
        alias_set.remove(encrypted_map[self.current])
        encrypted_map.pop(self.current,None)
        # print(alias_set)
        # print(encrypted_map)

        # Notify all members that this user has left
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'disconnect_notify',
                'alias': user,
            }
        )
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )


    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']
        alias = text_data_json['alias']
        if message == '--check--':
            self.current = alias
            # Notify all users that this user has joined
            await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'connect_notify',
                'alias': encrypted_map[self.current],
            }
            )
            return
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message,
                'alias': encrypted_map[self.current],
            }
        )
    
    # Handler for normal message
    async def chat_message(self, event):
        message = event['message']
        alias = event['alias']

        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'message': message,
            'alias':alias,
            'type':'--msg--',
        }))


    # Handler for disconnect notification
    async def disconnect_notify(self,event):
        alias = event['alias']
        await self.send(text_data=json.dumps({
            'alias':alias,
            'type':'--offline--',
        }))


    # Handler for new connection notification
    async def connect_notify(self,event):
        alias = event['alias']
        await self.send(text_data=json.dumps({
            'alias':alias,
            'type':'--new--',
        }))

