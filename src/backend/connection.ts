import {Client} from 'pg'

const client = new Client({
    user: 'root',
    host: 'localhost',
    database: 'calino',
    password: '123456',
    port: 5432,

})


client.connect();