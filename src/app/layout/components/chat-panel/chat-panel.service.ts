import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {FuseUtils} from '@fuse/utils';

@Injectable()
export class ChatPanelService
{
    contacts: any[];
    chats: any[];
    user: any;

    /**
     * Constructor
     *
     * @param _httpClient
     */
    constructor(
        private _httpClient: HttpClient
    )
    {
    }


    loadContacts(): Promise<any> | any
    {
        return new Promise<void>((resolve, reject) =>
        {
            Promise.all([
                this.getContacts(),
                this.getUser()
            ]).then(
                ([contacts, user]) =>
                {
                    this.contacts = contacts;
                    this.user = user;
                    resolve();
                },
                reject
            );
        });
    }


    getChat(contactId): Promise<any>
    {
        const chatItem = this.user.chatList.find((item) =>
        item.contactId === contactId);

        // Get the chat
        return new Promise((resolve, reject) =>
        {

            // If there is a chat with this user, return that.
            if (chatItem)
            {
                this._httpClient.get('api/chat-panel-chats/' + chatItem.chatId)
                    .subscribe((chat) =>
                    {

                        // Resolve the promise
                        resolve(chat);

                    }, reject);
            }
            // If there is no chat with this user, create one...
            else
            {
                this.createNewChat(contactId).then(() =>
                {

                    // and then recall the getChat method
                    this.getChat(contactId).then((chat) =>
                    {
                        resolve(chat);
                    });
                });
            }
        });
    }


    createNewChat(contactId): Promise<any>
    {
        return new Promise((resolve, reject) =>
        {

            // Generate a new id
            const chatId = FuseUtils.generateGUID();

            // Prepare the chat object
            const chat = {
                id: chatId,
                dialog: []
            };

            // Prepare the chat list entry
            const chatListItem = {
                chatId,
                contactId,
                lastMessageTime: '2017-02-18T10:30:18.931Z'
            };

            // Add new chat list item to the user's chat list
            this.user.chatList.push(chatListItem);

            // Post the created chat to the server
            this._httpClient.post('api/chat-panel-chats', {...chat})
                .subscribe(() =>
                {

                    // Post the updated user data to the server
                    this._httpClient.post('api/chat-panel-user/' + this.user.id, this.user)
                        .subscribe(r =>
                        {

                            // Resolve the promise
                            resolve(r);
                        });
                }, reject);
        });
    }

    updateChat(chatId, dialog): Promise<any>
    {
        return new Promise((resolve, reject) =>
        {

            const newData = {
                id: chatId,
                dialog
            };

            this._httpClient.post('api/chat-panel-chats/' + chatId, newData)
                .subscribe(updatedChat =>
                {
                    resolve(updatedChat);
                }, reject);
        });
    }

    getContacts(): Promise<any>
    {
        return new Promise((resolve, reject) =>
        {
            this._httpClient.get('api/chat-panel-contacts')
                .subscribe((response: any) =>
                {
                    resolve(response);
                }, reject);
        });
    }

    getUser(): Promise<any>
    {
        return new Promise((resolve, reject) =>
        {
            this._httpClient.get('api/chat-panel-user')
                .subscribe((response: any) =>
                {
                    resolve(response[0]);
                }, reject);
        });
    }
}
