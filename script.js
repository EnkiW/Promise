function Post(postId) {
    return fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Пост відсутній');
            }
            return response.json();
        });
}

function Comments(postId) {
    return fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Коментарі відсутні');
            }
            return response.json();
        });
}

function render(post) {
    const postCont = document.getElementById('postCont');
    const postB = document.createElement('div');
    postB.innerHTML = `
    <h2>${post.title}</h2>
    <p>${post.body}</p>
  `;
    const Button = document.createElement('button');
    Button.textContent = 'Коментарі';
    Button.onclick = () => {
        Comments(post.id)
            .then((comments) => {
                const List = document.createElement('ul');
                comments.forEach((comment) => {
                    const Item = document.createElement('li');
                    Item.textContent = comment.body;
                    List.appendChild(Item);
                });

                postB.appendChild(List);
            })
            .catch((error) => {
                console.error('Помилка коментарів:', error.message);
            });
    };

    postB.appendChild(Button);
    postCont.appendChild(postB);
}

function searchPost() {
    const postIdInput = document.getElementById('postIdInput');
    const postId = parseInt(postIdInput.value, 10);
    if (!Number.isInteger(postId) || postId < 1 || postId > 100) {
        console.error('Введіть дійсний ід (1-100)');
        return;
    }
    Post(postId)
        .then((post) => {
            const postCont = document.getElementById('postCont');
            postCont.innerHTML = '';
            render(post);
        })
        .catch((error) => {
            console.error('Помилка при отриманні поста:', error.message);
        });
}
