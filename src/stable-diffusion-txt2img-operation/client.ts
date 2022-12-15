import fetch from 'node-fetch';

export class StabilityClient {
    public api_url: string;
    constructor(private api_key: string, public engine: string, api_url?: string) {
        this.api_url = api_url ?? 'https://api.stability.ai'
    }
    async txt2img(prompt: string, options: Record<string, any>={}) {
        const url = `${this.api_url}/v1alpha/generation/${this.engine}/text-to-image`

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'image/png',
                Authorization: 'Bearer ' + this.api_key,
            },
            body: JSON.stringify({
                cfg_scale: 7,
                clip_guidance_preset: 'FAST_BLUE',
                height: 512,
                width: 512,
                samples: 1,
                steps: 50,
                ...options,
                text_prompts: [
                    {
                        text: prompt,
                        weight: 1
                    }
                ],
            })
        })

        if (!response.ok) {
            throw new Error(`Non-200 response: ${await response.text()}`);
        }

        return response;
    }
}