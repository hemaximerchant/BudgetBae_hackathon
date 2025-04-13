declare module "tailwindcss" {
    export type Config = {
        darkMode?: boolean | "media" | "class";
        content?: string[];
        theme?: {
            extend?: {
                colors?: Record<string, any>;
                borderRadius?: Record<string, any>;
                keyframes?: Record<string, any>;
                animation?: Record<string, any>;
                // Add other properties as needed
            };
        };
        // Add other properties as needed
    };
}