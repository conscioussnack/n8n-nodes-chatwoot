import {AITool, INodeType, INodeTypeDescription} from 'n8n-workflow';
import {N8NPropertiesBuilder, N8NPropertiesBuilderConfig} from '@devlikeapro/n8n-openapi-node';
import * as doc from './openapi.json';
import {AssignConversation} from './tools/assignConversation';
import {AddTag} from './tools/addTag';
import {SendSummary} from './tools/sendSummary';
import {AddNote} from './tools/addNote';

const config: N8NPropertiesBuilderConfig = {}
const parser = new N8NPropertiesBuilder(doc, config);
const properties = parser.build()

export class ChatWoot implements INodeType {
    description: INodeTypeDescription = {
        displayName: 'ChatWoot',
        name: 'chatWoot',
        icon: 'file:chatwoot.svg',
        group: ['transform'],
        version: 1,
        subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
        description: 'Interact with ChatWoot API',
        defaults: {
            name: 'ChatWoot',
        },
        inputs: ['main'],
        outputs: ['main'],
        credentials: [
            {
                name: 'chatwootApi',
                required: true,
            },
        ],
        requestDefaults: {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            baseURL: '={{$credentials.url}}',
        },
        properties: properties,
    };

    tools: AITool[] = [
        new AssignConversation(),
        new AddTag(),
        new SendSummary(),
        new AddNote(),
    ];
}
