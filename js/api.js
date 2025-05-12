class API {
    constructor(query) {
        this.query = query;
    }

   async getResults() {
        const response = await fetch("https://forkify-api.herokuapp.com/api/search?q=pizza");

        const data = await response.json();

        console.log(data);
    }
}

export default API;