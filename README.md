- RegionTodo will run on port 30043
- UserTodo will run on port 3004
- Client server will run on port 3002

Go to perticular folder and start all services 
-> npm i 
-> npm start

curl --location --request POST 'localhost:3002/api/v1/regions/addRegion' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name":"Surendranagar12",
    "desc":"rajkot Desc"
}'

above request will add region 

curl --location --request GET 'localhost:3002/api/v1/regions/getRegion'

get region will take all regions 
