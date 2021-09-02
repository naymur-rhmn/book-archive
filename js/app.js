const searchField = document.getElementById('search-feild');
const errorField = document.getElementById('error-msg');
const bookContainer = document.getElementById('book-container');
const searchResultDiv = document.getElementById('search-result');
const spinner = document.getElementById('spinner');


// getdata
const getData = () => {
    const search = searchField.value;
    searchField.value = '';
    errorField.innerText = '';
    searchResultDiv.textContent = '';
    bookContainer.textContent = '';
    spinner.classList.remove('d-none');
    fetch(`https://openlibrary.org/search.json?q=${search}`)
        .then(res => res.json())
        .then(data => displayData(data.docs))
}

// error handle
const errorHandle = bookArr => {
    if (bookArr.length === 0) {
        errorField.innerText = 'No results found, Opps! Input a book name'
    }
    else {
        errorField.innerText = '';
    }
}

// display data
const displayData = bookArr => {
    errorHandle(bookArr);
    // search result
    const div = document.createElement('div');
    div.classList.add('col');
    div.innerHTML = `
        <div class="card text-center">
            <p class="fs-5 m-0 p-2 ps-3">Search Results: ${bookArr.length}</p>
        </div>
    `;
    searchResultDiv.appendChild(div);
    spinner.classList.add('d-none');
    // display book content
    bookArr.forEach(book => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            <div class="card h-100">
                <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title mb-3">${book.title}</h5>
                    <p class=" mb-2"><span class="fw-bold">Author: </span>${book.author_name[0]}</p>
                    <p class=" mb-2"><span class="fw-bold">Publisher: </span>${book.publisher[0]}</p>
                    <p class=" mb-2"><span class="fw-bold">First Publish: </span>${book.first_publish_year}</p>
                    <p class=" mb-2"><span class="fw-bold">Publish Date: </span>${book.publish_date[0]}</p> 
                </div>
            </div>
        `;
        bookContainer.appendChild(div);
    });
}
