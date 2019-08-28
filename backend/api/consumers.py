from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
import json
from api.views import alias_set, encrypted_map

class ChatConsumer(WebsocketConsumer):
    def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = 'chat_%s' % self.room_name
        print(alias_set)
        print(encrypted_map)
        # Join room group
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )

        self.accept()


    def disconnect(self, close_code):
        alias_set.remove(encrypted_map[self.current])
        encrypted_map.pop(self.current,None)
        print(alias_set)
        print(encrypted_map)
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )


    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']
        alias = text_data_json['alias']
        if message == '--check--':
            self.current = alias #encrypted_map[alias]
            return
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message,
                'alias': encrypted_map[self.current],
            }
        )
    
    def chat_message(self, event):
        message = event['message']
        alias = event['alias']

        # Send message to WebSocket
        self.send(text_data=json.dumps({
            'message': message,
            'alias':alias,
        }))