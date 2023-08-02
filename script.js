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

    const postBlock = document.createElement('div');
    postBlock.innerHTML = `
    <h2>${post.title}</h2>
    <p>${post.body}</p>
  `;

    const commentsButton = document.createElement('button');
    commentsButton.textContent = 'Отримати коментарі';
    commentsButton.onclick = () => {
        Comments(post.id)
            .then((comments) => {
                const commentsList = document.createElement('ul');
                comments.forEach((comment) => {
                    const commentItem = document.createElement('li');
                    commentItem.textContent = comment.body;
                    commentsList.appendChild(commentItem);
                });

                postBlock.appendChild(commentsList);
            })
            .catch((error) => {
                console.error('Помилка коментарів:', error.message);
            });
    };

    postBlock.appendChild(commentsButton);
    postCont.appendChild(postBlock);
}

function searchPost() {
    const postIdInput = document.getElementById('postIdInput');
    const postId = parseInt(postIdInput.value, 10);

    if (!Number.isInteger(postId) || postId < 1 || postId > 100) {
        alert('Введіть дійсний ID (1-100)');
        return;
    }

    Post(postId)
        .then((post) => {
            const postCont = document.getElementById('postCont');
            postCont.innerHTML = '';
            render(post);
        })
        .catch((error) => {
            console.error('Помилка поста:', error.message);
        });
}
