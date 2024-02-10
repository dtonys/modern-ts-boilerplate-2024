function timeout(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

export default {
    async test() {
        const response = await fetch('/api/test');
        const json = await response.json();
        console.log(json); // eslint-disable-line no-console
    },
    async echo(str) {
        const response = await fetch('/api/echo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: str })
        });
        const json = await response.json();
        return json;
    }
};
