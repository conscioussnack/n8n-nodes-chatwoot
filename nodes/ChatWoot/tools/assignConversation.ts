import {AITool, ToolInput} from 'n8n-workflow';

export class AssignConversation implements AITool {
	name = 'assignConversation';
	description = 'Assign a conversation to an agent or a team';

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
			name: 'assigneeId',
			description: 'Id of the assignee user',
			type: 'number',
		},
		{
			name: 'teamId',
			description: 'Id of the team. If the assignee_id is present, this param would be ignored',
			type: 'number',
		},
	];

	async run(inputs: Record<string, any>): Promise<any> {
		// @ts-ignore
		const credentials = await this.getCredentials('chatwootApi');
		const baseUrl = credentials.url;
		const response = await this.helpers.request({
			method: 'POST',
			url: `${baseUrl}/api/v1/accounts/${inputs.accountId}/conversations/${inputs.conversationId}/assignments`,
			headers: {
				'api_access_token': credentials.apiKey,
			},
			body: {
				assignee_id: inputs.assigneeId,
				team_id: inputs.teamId,
			},
			json: true,
		});
		return response;
	}
}
