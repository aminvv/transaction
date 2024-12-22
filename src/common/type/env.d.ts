namespace NodeJS{
    interface ProcessEnv{
        DB_PORT:string,
        DB_DATABASE:string,
        DB_HOST:string,
        DB_USERNAME:string,
        DB_PASSWORD:string,


        //Token
        OTP_TOKEN_SECRET:string,
        COOKIE_SECRET:string,
        ACCESS_TOKEN_SECRET:string,

    }
} 