# SecurBankDemo.com
SecurBank Demo Site for Adobe Experience Manager with Edge Delivery Services hosted at https://www.securbankdemo.com

## Environments
- Preview: https://main--securbank-aem-ue--markszulc.aem.page/
- Live: https://main--securbank-aem-ue--markszulc.aem.live/

## AEM Configuration
Headless GraphQL calls are still being made to the Publish / Dispatcher at this time. 
You will need to the AEM Author and Publish URLs in `scripts/endpointconfig.js`

## Installation

```sh
npm i
```

## Linting

```sh
npm run lint
```

## Local development

1. Clone this repo and update the mountpoint in the `fstab.yaml` to match your own environment
1. Add the [AEM Code Sync GitHub App](https://github.com/apps/aem-code-sync) to the repository
1. Install the [AEM CLI](https://github.com/adobe/helix-cli): `npm install -g @adobe/aem-cli`
1. Start AEM Proxy: `aem up` (opens your browser at `http://localhost:3000`)
1. Open the `securebank` directory in your favorite IDE and start coding :)
