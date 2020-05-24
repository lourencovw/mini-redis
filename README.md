# Mini Redis

1 - Download libraries

    > npm install


    
2 - Testing

    > npm run test



3 - Networking

    > npm run serve

    Examples:
        > curl "localhost:8080/?cmd=SET%key%20value"
        OK
        > curl "localhost:8080/?cmd=GET%20key"
        value

        

4 - Mini Redis CLI

    > npm run mini-redis-cli

    Examples: 
        Mini Redis >  SET key value
        OK
        Mini Redis >  GET key
        value

