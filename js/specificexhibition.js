const mainContentHolder = document.querySelector(".specificexhibition-contentwrapper");
const pageH1 = document.querySelector(".specificexhibition-h1");


const queryString = document.location.search;
const queryParam = new URLSearchParams(queryString);
const postIdNumber = queryParam.get("post_id");
const postColor = queryParam.get("color");

console.log(typeof(postColor));

mainContentHolder.style.backgroundColor = `#${postColor}`; 

if (postColor === "d4002f") {
    mainContentHolder.style.color = "#ffffff";
} else {
    mainContentHolder.style.color = "#000000";
}

const postContentApiLink = `https://ehtoday.one/assignments/museum/wp-json/wp/v2/posts/${postIdNumber}`;

async function postContentFetcher(apiLinkOfPost) {

    try {
        const firstFetch = await fetch(apiLinkOfPost);
        const firstResponse = await firstFetch.json();
        
        console.log(firstResponse);

        document.title = `Community Science Museum | ${firstResponse.title.rendered}`;
        document.querySelector(`meta[name="description"]`).setAttribute("content", `A Community Science Museum post about ${firstResponse.title.rendered}.`);

        pageH1.innerHTML = firstResponse.title.rendered;
        mainContentHolder.innerHTML = `${firstResponse.content.rendered}`;


    } catch(error) {

        pageH1.innerHTML = "Error!";
        mainContentHolder.innerHTML = `<p>An error has occured while fetching the post content, please try again or contact us!</p>`;

    }

}

postContentFetcher(postContentApiLink);