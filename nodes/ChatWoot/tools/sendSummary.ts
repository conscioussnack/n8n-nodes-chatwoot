import {AITool, ToolInput} from 'n8n-workflow';

export class SendSummary implements AITool {
	name = 'sendSummary';
	description = 'Send a summary message to a conversation';

	inputs: ToolInput[] = [
		{
			name: 'accountId',
			description: 'The numeric ID of the account',
			type: 'number',
			required: true,
		},
		{
			name: 'conversationId',
			description: 'The numeric ID of the conversation',
			type: 'number',
			required: true,
		},
		{
			name: 'message',
			description: 'The summary message to be sent',
			type: 'string',
			required: true,
		},
	];

	async run(inputs: Record<string, any>): Promise<any> {
		// @ts-ignore
		const credentials = await this.getCredentials('chatwootApi');
		const baseUrl = credentials.url;
		const response = await this.helpers.request({
			method: 'POST',
			url: `${baseUrl}/api/v1/accounts/${inputs.accountId}/conversations/${inputs.conversationId}/messages`,
			headers: {
				'api_access_token': credentials.apiKey,
			},
			body: {
				content: inputs.message,
				message_type: 'outgoing',
				private: false,
			},
			json: true,
		});
		return response;
	}
}
