import axios from 'axios';

const api = axios.create({
    baseURL: "http://10.0.2.2:3333/api/v1",
    timeout: 2000
})

export default api

/* If you do not find your answer in other posts

In my case, I use Rails for the backend and I tried to make requests to http://localhost:3000 using Axios but every time I got Network Error as a response. Then I found out that I need to make a request to http://10.0.2.2:3000 in the case of the android simulator. For the iOS simulator, it works fine with http://localhost:3000.

Conclusion
use

http://10.0.2.2:3000
instead of

http://localhost:3000 */