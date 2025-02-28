export const abi = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"components": [
					{
						"internalType": "string",
						"name": "street",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "city",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "state",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "zip",
						"type": "string"
					}
				],
				"internalType": "struct DeRide.Address",
				"name": "pickup",
				"type": "tuple"
			}
		],
		"name": "requestRide",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			}
		],
		"name": "getRide",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "guest",
						"type": "string"
					},
					{
						"components": [
							{
								"internalType": "string",
								"name": "street",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "city",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "state",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "zip",
								"type": "string"
							}
						],
						"internalType": "struct DeRide.Address",
						"name": "pickup",
						"type": "tuple"
					}
				],
				"internalType": "struct DeRide.Ride",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
] as const