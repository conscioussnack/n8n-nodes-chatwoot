import {AITool, ToolInput} from 'n8n-workflow';

export class AddTag implements AITool {
	name = 'addTag';
	description = 'Add tags (labels) to a conversation';

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
			name: 'tags',
			description: 'Array of labels (comma-separated strings)',
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
			url: `${baseUrl}/api/v1/accounts/${inputs.accountId}/conversations/${inputs.conversationId}/labels`,
			headers: {
				'api_access_token': credentials.apiKey,
			},
			body: {
				labels: inputs.tags.split(','),
			},
			json: true,
		});
		return response;
	}
}
