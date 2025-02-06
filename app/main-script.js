

// function updateUI(data) {
//     // Обновление фото профиля
//     if (data.profilePicture && data.profilePicture.S) {
//         document.getElementById('profile-pic').src = data.profilePicture.S;
//     }

//     // Обновление количества кредитов
//     if (data.credits && data.credits.N) {
//         document.getElementById('credits').textContent = `Credits: ${data.credits.N}`;
//     } else {
//         document.getElementById('credits').textContent = `Credits: 0`;
//     }

//     // Обновление списка книг
//     const chatList = document.getElementById('chat-list');
//     chatList.innerHTML = '';

//     if (data.books && data.books.M) {
//         Object.entries(data.books.M).forEach(([bookTitle, bookData]) => {
//             if (bookData.S) {
//                 const listItem = document.createElement('li');
//                 listItem.textContent = bookTitle.replace(/_[a-z0-9]+$/, ''); // Убираем ID из названия
//                 listItem.setAttribute('data-id', bookData.S);
//                 listItem.onclick = () => openChatBook(bookData.S);
//                 chatList.appendChild(listItem);
//             }
//         });
//     }
// }

function updateUI(data) {
    console.log("Ответ от сервера:", data);

    // // Обновление фото профиля
    // if (data.profilePicture && data.profilePicture.S) {
    //     document.getElementById('profile-pic').src = data.profilePicture.S;
    // }

    // // Обновление количества кредитов
    // if (data.credits && data.credits.N) {
    //     document.getElementById('credits').textContent = `Credits: ${data.credits.N}`;
    // } else {
    //     document.getElementById('credits').textContent = `Credits: 0`;
    // }

    // // Обновление списка книг
    // const chatList = document.getElementById('chat-list');
    // chatList.innerHTML = '';

    // if (data.books && data.books.M) {
    //     Object.entries(data.books.M).forEach(([bookTitle, bookData]) => {
    //         if (bookData.S) {
    //             const listItem = document.createElement('li');
    //             listItem.textContent = bookTitle.replace(/_[a-z0-9]+$/, ''); // Убираем ID из названия
    //             listItem.setAttribute('data-id', bookData.S);
    //             listItem.onclick = () => openChatBook(bookData.S);
    //             chatList.appendChild(listItem);
    //         }
    //     });
    // }
}



window.onload = function () {
    const urlParams = new URLSearchParams(window.location.search);
    const authorizationCode = urlParams.get('code');
    const jwtToken = localStorage.getItem('jwtToken');

    const payload = { code: authorizationCode || null };

    const headers = {
        'Content-Type': 'application/json'
    };
    if (jwtToken) {
        headers['Authorization'] = `Bearer ${jwtToken}`;
    }

    fetch('https://vjydgrki9a.execute-api.us-east-2.amazonaws.com/default/', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(payload)
    })
    .then(response => {
        if (response.status === 401) {
            window.location.href = 'https://ivanvania.github.io/testRepository/login/';
            return;
        }
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        if (data.error) {
            if (data.error === 'Authentication failed') {
                window.location.href = 'https://ivanvania.github.io/testRepository/login/';
            }
        } else {
            if (data.accessToken) {
                localStorage.setItem('jwtToken', data.accessToken);
            }
            // updateUI(data.user); // 
        }
    })
    .catch(error => {
        console.error('Error executing request:', error);
    });
};

function logout() {
    localStorage.removeItem('jwtToken');
    window.location.href = 'https://ivanvania.github.io/testRepository/login/';
}



















// navbar-component.js
function createNavbar() {
    const navbar = document.createElement("div");
    navbar.style.display = "flex";
    navbar.style.alignItems = "center";
    navbar.style.justifyContent = "space-between";
    navbar.style.width = "100%";
    navbar.style.height = "70px";
    navbar.style.padding = "0 30px";
    navbar.style.background = "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)";
    navbar.style.boxShadow = "0 4px 15px rgba(0,0,0,0.1)";
    navbar.style.boxSizing = "border-box";
    navbar.style.position = "relative";
    navbar.style.zIndex = "1000";

    const title = document.createElement("h1");
    title.textContent = "BOOK AI";
    title.style.background = "linear-gradient(to right, #fff 20%, #dcebff 100%)";
    title.style.webkitBackgroundClip = "text";
    title.style.webkitTextFillColor = "transparent";
    title.style.backgroundClip = "text";
    title.style.color = "transparent";
    title.style.fontSize = "2.2rem";
    title.style.fontWeight = "900";
    title.style.letterSpacing = "2px";
    title.style.textShadow = "2px 2px 4px rgba(0,0,0,0.1)";
    title.style.fontFamily = "'Segoe UI', system-ui, -apple-system, sans-serif";
    title.style.margin = "0";
    title.style.cursor = "pointer";
    title.style.transition = "transform 0.3s ease";
    
    title.onmouseover = () => title.style.transform = "scale(1.05)";
    title.onmouseout = () => title.style.transform = "scale(1)";

    const rightSection = createRightSection();
    navbar.appendChild(title);
    navbar.appendChild(rightSection);
    return navbar;
}


function createRightSection() {
    const rightSection = document.createElement("div");
    rightSection.style.display = "flex";
    rightSection.style.alignItems = "center";
    rightSection.style.gap = "20px";

    const credits = createCredits();
    const buyCreditsBtn = createBuyCreditsButton();
    const profileContainer = createProfileContainer();
    const logoutBtn = createLogoutButton();

    rightSection.append(credits, buyCreditsBtn, profileContainer, logoutBtn);
    return rightSection;
}

function createCredits() {
    const credits = document.createElement("div");
    credits.style.display = "flex";
    credits.style.alignItems = "center";
    credits.style.padding = "8px 15px";
    credits.style.background = "rgba(255,255,255,0.1)";
    credits.style.borderRadius = "20px";
    credits.style.color = "white";
    credits.style.fontSize = "14px";
    credits.style.fontWeight = "500";
    credits.style.backdropFilter = "blur(5px)";
    credits.textContent = "Credits: 0";
    return credits;
}

function createBuyCreditsButton() {
    const buyCreditsBtn = document.createElement("button");
    buyCreditsBtn.textContent = "Buy Credits";
    buyCreditsBtn.style.padding = "10px 20px";
    buyCreditsBtn.style.background = "linear-gradient(to right, #00bcd4, #2196f3)";
    buyCreditsBtn.style.color = "white";
    buyCreditsBtn.style.border = "none";
    buyCreditsBtn.style.borderRadius = "25px";
    buyCreditsBtn.style.cursor = "pointer";
    buyCreditsBtn.style.fontSize = "14px";
    buyCreditsBtn.style.fontWeight = "600";
    buyCreditsBtn.style.transition = "all 0.3s ease";
    buyCreditsBtn.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)";
    
    buyCreditsBtn.onmouseover = () => {
        buyCreditsBtn.style.transform = "translateY(-2px)";
        buyCreditsBtn.style.boxShadow = "0 4px 15px rgba(0,0,0,0.2)";
    };
    
    buyCreditsBtn.onmouseout = () => {
        buyCreditsBtn.style.transform = "translateY(0)";
        buyCreditsBtn.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)";
    };
    
    return buyCreditsBtn;
}

function createProfileContainer() {
    const profileContainer = document.createElement("div");
    profileContainer.style.width = "45px";
    profileContainer.style.height = "45px";
    profileContainer.style.borderRadius = "50%";
    profileContainer.style.border = "2px solid rgba(255,255,255,0.2)";
    profileContainer.style.overflow = "hidden";
    profileContainer.style.cursor = "pointer";
    profileContainer.style.transition = "transform 0.3s ease";
    profileContainer.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)";

    const profileImg = document.createElement("img");
    profileImg.src = "https://via.placeholder.com/45";
    profileImg.style.width = "100%";
    profileImg.style.height = "100%";
    profileImg.style.objectFit = "cover";
    
    profileContainer.onmouseover = () => profileContainer.style.transform = "scale(1.1)";
    profileContainer.onmouseout = () => profileContainer.style.transform = "scale(1)";
    
    profileContainer.appendChild(profileImg);
    return profileContainer;
}

function createLogoutButton() {
    const logoutBtn = document.createElement("button");
    logoutBtn.textContent = "Log out";
    logoutBtn.style.padding = "10px 20px";
    logoutBtn.style.background = "linear-gradient(to right, #ff4081, #ff1744)";
    logoutBtn.style.color = "white";
    logoutBtn.style.border = "none";
    logoutBtn.style.borderRadius = "25px";
    logoutBtn.style.cursor = "pointer";
    logoutBtn.style.fontSize = "14px";
    logoutBtn.style.fontWeight = "600";
    logoutBtn.style.transition = "all 0.3s ease";
    logoutBtn.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)";
    
    logoutBtn.onmouseover = () => {
        logoutBtn.style.transform = "translateY(-2px)";
        logoutBtn.style.boxShadow = "0 4px 15px rgba(0,0,0,0.2)";
    };
    
    logoutBtn.onmouseout = () => {
        logoutBtn.style.transform = "translateY(0)";
        logoutBtn.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)";
    };
    
    return logoutBtn;
}






//USER DATA - OBJECT








// sidebar-component.js
const sampleBooks = [
    { id: 1, title: "The AI Revolution", category: "Science", lastEdited: "Just now" },
    { id: 2, title: "Deep Learning Basics", category: "Technology", lastEdited: "2h ago" },
    { id: 3, title: "Future of Computing", category: "Technology", lastEdited: "3h ago" },
    { id: 4, title: "Quantum Physics", category: "Science", lastEdited: "5h ago" },
    { id: 5, title: "Web Development", category: "Programming", lastEdited: "Yesterday" },
    { id: 6, title: "Data Science", category: "Technology", lastEdited: "2 days ago" },
    { id: 7, title: "Machine Learning", category: "AI", lastEdited: "3 days ago" },
    { id: 8, title: "Python Mastery", category: "Programming", lastEdited: "4 days ago" },
    { id: 9, title: "JavaScript Advanced", category: "Programming", lastEdited: "5 days ago" },
    { id: 10, title: "Cybersecurity", category: "Technology", lastEdited: "1 week ago" },    
    { id: 13, title: "Future of Computing", category: "Technology", lastEdited: "3h ago" },
    { id: 14, title: "Quantum Physics", category: "Science", lastEdited: "5h ago" },
    { id: 15, title: "Web Development", category: "Programming", lastEdited: "Yesterday" },
    { id: 16, title: "Data Science", category: "Technology", lastEdited: "2 days ago" },
    { id: 17, title: "Machine Learning", category: "AI", lastEdited: "3 days ago" },
    { id: 18, title: "Python Mastery", category: "Programming", lastEdited: "4 days ago" },
    { id: 19, title: "JavaScript Advanced", category: "Programming", lastEdited: "5 days ago" },
    { id: 110, title: "Cybersecurity", category: "Technology", lastEdited: "1 week ago" },
];









//----
function createSidebar() {
    const sidebar = document.createElement("div");
    sidebar.style.width = "280px";
    sidebar.style.height = "calc(100vh - 70px)";
    sidebar.style.background = "linear-gradient(to bottom, #ffffff, #f8fafc)";
    sidebar.style.borderRight = "1px solid rgba(0,0,0,0.1)";
    sidebar.style.padding = "20px";
    sidebar.style.boxSizing = "border-box";
    sidebar.style.boxShadow = "2px 0 15px rgba(0,0,0,0.03)";
    sidebar.style.position = "relative";
    sidebar.style.zIndex = "1";

    const header = createSidebarHeader();
    const booksList = createBooksList();
    const newBookBtn = createNewBookButton(booksList);

    sidebar.appendChild(header);
    sidebar.appendChild(newBookBtn);
    sidebar.appendChild(booksList);

    // Initialize with sample books
    sampleBooks.forEach(book => addNewBook(booksList, book));

    return sidebar;
}

function createSidebarHeader() {
    const header = document.createElement("div");
    header.style.marginBottom = "20px";
    header.style.padding = "0 5px";

    const title = document.createElement("h2");
    title.textContent = "My Library";
    title.style.fontSize = "20px";
    title.style.fontWeight = "600";
    title.style.color = "#1e293b";
    title.style.margin = "0 0 5px 0";

    const subtitle = document.createElement("p");
    subtitle.textContent = `${sampleBooks.length} books`;
    subtitle.style.fontSize = "13px";
    subtitle.style.color = "#64748b";
    subtitle.style.margin = "0";

    header.appendChild(title);
    header.appendChild(subtitle);
    return header;
}

function createBooksList() {
    const booksList = document.createElement("div");
    booksList.style.marginTop = "20px";
    booksList.style.display = "flex";
    booksList.style.flexDirection = "column";
    booksList.style.gap = "10px";
    booksList.style.overflowY = "auto";
    booksList.style.maxHeight = "calc(100vh - 200px)";
    booksList.style.paddingRight = "5px";
    
    // Custom scrollbar
    booksList.style.scrollbarWidth = "thin";
    booksList.style.scrollbarColor = "#cbd5e1 transparent";

    // Webkit scrollbar
    booksList.style.cssText += `
        &::-webkit-scrollbar {
            width: 6px;
        }
        &::-webkit-scrollbar-track {
            background: transparent;
        }
        &::-webkit-scrollbar-thumb {
            background-color: #cbd5e1;
            border-radius: 3px;
        }
    `;

    return booksList;
}





// BOTTON 
//create new book Bottom
function createNewBookButton(booksList) {
    const btn = document.createElement("button");
    btn.innerHTML = `
        <svg style="width: 18px; height: 18px; margin-right: 10px; filter: drop-shadow(0 2px 4px rgba(255,255,255,0.2));" 
             fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" 
                  d="M12 4v16m8-8H4"/>
        </svg>
        Create New Book
    `;
    
    // Add keyframes for pulse animation
    const keyframes = `
        @keyframes pulseGlow {
            0% { box-shadow: 0 4px 12px rgba(59, 130, 246, 0.25), 0 0 0 0 rgba(59, 130, 246, 0.4); }
            70% { box-shadow: 0 4px 12px rgba(59, 130, 246, 0.25), 0 0 0 10px rgba(59, 130, 246, 0); }
            100% { box-shadow: 0 4px 12px rgba(59, 130, 246, 0.25), 0 0 0 0 rgba(59, 130, 246, 0); }
        }
    `;
    const style = document.createElement('style');
    style.textContent = keyframes;
    document.head.appendChild(style);
    
    // Enhanced button styles
    btn.style.width = "100%";
    btn.style.padding = "14px 20px";
    btn.style.background = "linear-gradient(135deg, #4f46e5 0%, #3b82f6 50%, #2563eb 100%)";
    btn.style.color = "white";
    btn.style.border = "none";
    btn.style.borderRadius = "14px";
    btn.style.cursor = "pointer";
    btn.style.fontSize = "15px";
    btn.style.fontWeight = "600";
    btn.style.display = "flex";
    btn.style.alignItems = "center";
    btn.style.justifyContent = "center";
    btn.style.transition = "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)";
    btn.style.boxShadow = "0 4px 12px rgba(59, 130, 246, 0.25)";
    btn.style.position = "relative";
    btn.style.overflow = "hidden";
    btn.style.letterSpacing = "0.3px";
    btn.style.textShadow = "0 2px 4px rgba(0,0,0,0.1)";

    // Add shine effect
    btn.style.backgroundSize = "200% 200%";
    btn.style.animation = "gradient 5s ease infinite";
    
    // Hover effects
    btn.onmouseover = () => {
        btn.style.transform = "translateY(-2px) scale(1.02)";
        btn.style.boxShadow = "0 8px 25px rgba(59, 130, 246, 0.35)";
        btn.style.animation = "pulseGlow 2s infinite";
        btn.style.background = "linear-gradient(135deg, #4338ca 0%, #3b82f6 50%, #1d4ed8 100%)";
    };

    // Mouse out effects
    btn.onmouseout = () => {
        btn.style.transform = "translateY(0) scale(1)";
        btn.style.boxShadow = "0 4px 12px rgba(59, 130, 246, 0.25)";
        btn.style.animation = "gradient 5s ease infinite";
        btn.style.background = "linear-gradient(135deg, #4f46e5 0%, #3b82f6 50%, #2563eb 100%)";
    };

    // Active state
    btn.onmousedown = () => {
        btn.style.transform = "translateY(1px) scale(0.98)";
        btn.style.boxShadow = "0 2px 8px rgba(59, 130, 246, 0.2)";
    };

    // Click handler
    btn.onclick = () => {
        openNewChatArea();
    };

    return btn;
}

function openNewChatArea() {
    // Ищем контейнер, где отображается область чата
    const chatAreaContainer = document.getElementById("chat-area-container");
    // Очищаем текущее содержимое (например, стартовый экран)
    chatAreaContainer.innerHTML = "";
    // Создаем новый чат для создания книги
    const newChatArea = createNewBookChatArea();
    // Вставляем новый компонент в контейнер
    chatAreaContainer.appendChild(newChatArea);
}


















// function addNewBook(booksList, bookData) {
//     const book = document.createElement("div");
//     book.style.padding = "12px 16px";
//     book.style.backgroundColor = "white";
//     book.style.borderRadius = "10px";
//     book.style.cursor = "pointer";
//     book.style.transition = "all 0.2s ease";
//     book.style.border = "1px solid rgba(0,0,0,0.05)";
//     book.style.boxShadow = "0 2px 4px rgba(0,0,0,0.02)";
//     book.style.position = "relative";

//     book.innerHTML = `
//         <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px">
//             <div style="font-size: 14px; font-weight: 500; color: #334155">${bookData.title}</div>
//             <div style="font-size: 11px; color: #94a3b8">${bookData.lastEdited}</div>
//         </div>
//         <div style="font-size: 12px; color: #64748b">${bookData.category}</div>
//     `;

//     // Hover effects
//     book.onmouseover = () => {
//         book.style.backgroundColor = "#f8fafc";
//         book.style.borderColor = "#3b82f6";
//         book.style.transform = "translateX(5px)";
//         book.style.boxShadow = "0 4px 12px rgba(0,0,0,0.05)";
//     };

//     book.onmouseout = () => {
//         book.style.backgroundColor = "white";
//         book.style.borderColor = "rgba(0,0,0,0.05)";
//         book.style.transform = "translateX(0)";
//         book.style.boxShadow = "0 2px 4px rgba(0,0,0,0.02)";
//     };

//     book.onclick = () => openChat(bookData.title);
    
//     booksList.appendChild(book);
// }

//list --- view
function createBookItem(bookData) {
    const book = document.createElement("div");
    book.style.padding = "12px 16px";
    book.style.backgroundColor = "white";
    book.style.borderRadius = "10px";
    book.style.cursor = "pointer";
    book.style.transition = "all 0.2s ease";
    book.style.border = "1px solid rgba(0,0,0,0.05)";
    book.style.boxShadow = "0 2px 4px rgba(0,0,0,0.02)";
    book.style.position = "relative";
    book.style.width = "100%";
    book.style.boxSizing = "border-box";
    book.style.marginBottom = "8px";

    book.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px">
            <div style="font-size: 14px; font-weight: 500; color: #334155">${bookData.title}</div>
            <div style="display: flex; align-items: center; gap: 8px;">
                <div style="font-size: 11px; color: #94a3b8">${bookData.lastEdited}</div>
                <div class="menu-trigger" style="cursor: pointer; padding: 4px; border-radius: 4px; transition: all 0.2s ease;">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" style="color: #94a3b8">
                        <circle cx="8" cy="2" r="1.5"/>
                        <circle cx="8" cy="8" r="1.5"/>
                        <circle cx="8" cy="14" r="1.5"/>
                    </svg>
                </div>
            </div>
        </div>
        <div style="font-size: 12px; color: #64748b">${bookData.category}</div>
    `;

    const dropdown = document.createElement("div");
    dropdown.style.position = "absolute";
    dropdown.style.right = "12px";
    dropdown.style.top = "30px";
    dropdown.style.background = "white";
    dropdown.style.borderRadius = "8px";
    dropdown.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
    dropdown.style.padding = "6px";
    dropdown.style.display = "none";
    dropdown.style.zIndex = "100";
    dropdown.style.border = "1px solid #e2e8f0";
    dropdown.style.minWidth = "150px";

    const deleteBtn = document.createElement("div");
    deleteBtn.innerHTML = `
        <div style="display: flex; align-items: center; gap: 8px; padding: 8px 12px; color: #ef4444; font-size: 13px; font-weight: 500; border-radius: 6px; cursor: pointer; transition: all 0.2s ease;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
            </svg>
            Delete Book
        </div>
    `;

    deleteBtn.onmouseover = () => {
        deleteBtn.style.backgroundColor = "#fef2f2";
    };

    deleteBtn.onmouseout = () => {
        deleteBtn.style.backgroundColor = "transparent";
    };

    deleteBtn.onclick = (e) => {
        e.stopPropagation();
        if (confirm("Are you sure you want to delete this book?")) {
            book.remove();
        }
        dropdown.style.display = "none";
    };

    dropdown.appendChild(deleteBtn);
    book.appendChild(dropdown);

    const menuTrigger = book.querySelector('.menu-trigger');
    menuTrigger.onclick = (e) => {
        e.stopPropagation();
        dropdown.style.display = dropdown.style.display === "none" ? "block" : "none";
    };

    menuTrigger.onmouseover = () => {
        menuTrigger.style.backgroundColor = "#f1f5f9";
    };

    menuTrigger.onmouseout = () => {
        menuTrigger.style.backgroundColor = "transparent";
    };

    document.addEventListener('click', () => {
        dropdown.style.display = "none";
    });

    book.onmouseover = () => {
        book.style.backgroundColor = "#f8fafc";
        book.style.borderColor = "#3b82f6";
        book.style.transform = "translateX(5px)";
        book.style.boxShadow = "0 4px 12px rgba(0,0,0,0.05)";
    };

    book.onmouseout = () => {
        book.style.backgroundColor = "white";
        book.style.borderColor = "rgba(0,0,0,0.05)";
        book.style.transform = "translateX(0)";
        book.style.boxShadow = "0 2px 4px rgba(0,0,0,0.02)";
    };

    book.onclick = () => openChatBook(bookDat.id);

    return book;
}

function addNewBook(booksList, bookData) {
    const bookItem = createBookItem(bookData);
    booksList.appendChild(bookItem);
}




function openChatBook(bookId) { //create chat area
  // Находим контейнер центральной области (предполагается, что он является вторым дочерним элементом main-container)
  const mainContainer = document.getElementById("main-container");
  // Второй дочерний элемент – это область для чата (или initial screen)
  const chatContainer = mainContainer.children[1];
  chatContainer.innerHTML = ""; // очищаем старое содержимое
  
  // Запускаем индикатор загрузки (предполагается, что переменная loadingIndicator доступна глобально)
  window.loadingIndicator.startLoading();
  
  // Делаем POST‑запрос к API
  fetch('https://g8qyy5fxc0.execute-api.us-east-2.amazonaws.com/default/', {
    method: 'POST',
    headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwtToken')}` 
    },
    body: JSON.stringify({ bookId: bookId })
  })
    .then(response => response.json())
    .then(bookData => {
      // Останавливаем индикатор загрузки
      window.loadingIndicator.stopLoading();
      
      // Создаём область чата, которая выбирается по состоянию (state) книги
      const chatArea = createChatAreaWithState(bookData);
      
      // Добавляем план книги в начало области сообщений (если нужно)
      const messagesArea = chatArea.querySelector('.messages-area');
      if (messagesArea) {
        const planMessage = document.createElement('div');
        planMessage.style.padding = "10px 20px";
        planMessage.style.marginBottom = "10px";
        planMessage.style.borderBottom = "1px solid #e2e8f0";
        planMessage.textContent = bookData.plan;
        messagesArea.insertBefore(planMessage, messagesArea.firstChild);
      }
      
      // Обновляем центральную область – вставляем созданное окно чата
      chatContainer.innerHTML = "";
      chatContainer.appendChild(chatArea);
    })
    .catch(error => {
      window.loadingIndicator.stopLoading();
      console.error("Ошибка API:", error);
      chatContainer.innerHTML = "<p>Ошибка загрузки данных книги</p>";
    });
}
//
function createChatAreaWithState(bookData) {
  const chatArea = document.createElement("div");
  chatArea.style.flex = "1";
  chatArea.style.display = "flex";
  chatArea.style.flexDirection = "column";
  chatArea.style.height = "100%";
  chatArea.style.backgroundColor = "#ffffff";
  
  // Область для сообщений – для вставки плана и прочих сообщений
  const messagesArea = createMessagesArea();
  messagesArea.classList.add("messages-area");
  
  // Разделитель между сообщениями и панелью ввода/интерактивным блоком
  const divider = createDivider();
  
  let inputPanel;
  if (bookData.state === 'START') {
    // Например, запускаем функцию для отслеживания прогресса (если она нужна)
    startProgressCheck(bookData.BookID);
    inputPanel = createInputPanel3(messagesArea);
  } else if (bookData.state === 'FINISHED') {
    inputPanel = createInputPanel4(messagesArea);
  } else if (bookData.state === 'ERROR') {
    inputPanel = createInputPanel5(messagesArea);
  } else {
    // Если state неизвестен, можно использовать панель по умолчанию (например, UI1)
    inputPanel = createInputPanel(messagesArea);
  }
  
  chatArea.appendChild(messagesArea);
  chatArea.appendChild(divider);
  chatArea.appendChild(inputPanel);
  
  return chatArea;
}










































function createInitialScreen() {//0----
    const screen = document.createElement("div");
    screen.style.flex = "1";
    screen.style.display = "flex";
    screen.style.flexDirection = "column";
    screen.style.alignItems = "center";
    screen.style.justifyContent = "center";
    screen.style.padding = "40px";
    screen.style.backgroundColor = "#ffffff";

    // Add animation keyframes
    const keyframes = `
        @keyframes fadeUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        @keyframes floating {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
        }
    `;
    const style = document.createElement('style');
    style.textContent = keyframes;
    document.head.appendChild(style);

    // Book icon
    const icon = document.createElement("div");
    icon.innerHTML = `
        <svg style="width: 80px; height: 80px;" viewBox="0 0 24 24" fill="none" stroke="url(#gradient)">
            <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color: #3b82f6" />
                    <stop offset="100%" style="stop-color: #8b5cf6" />
                </linearGradient>
            </defs>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
        </svg>
    `;
    icon.style.marginBottom = "30px";
    icon.style.animation = "floating 3s ease-in-out infinite";

    // Welcome text
    const welcome = document.createElement("div");
    welcome.textContent = "Welcome to";
    welcome.style.fontSize = "32px";
    welcome.style.fontWeight = "600";
    welcome.style.marginBottom = "10px";
    welcome.style.background = "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)";
    welcome.style.webkitBackgroundClip = "text";
    welcome.style.webkitTextFillColor = "transparent";
    welcome.style.animation = "fadeUp 0.8s ease-out forwards";

    // Book AI text
    const bookAI = document.createElement("div");
    bookAI.textContent = "Book AI";
    bookAI.style.fontSize = "48px";
    bookAI.style.fontWeight = "700";
    bookAI.style.letterSpacing = "-0.02em";
    bookAI.style.background = "linear-gradient(135deg, #1e293b 0%, #3b82f6 100%)";
    bookAI.style.webkitBackgroundClip = "text";
    bookAI.style.webkitTextFillColor = "transparent";
    bookAI.style.animation = "fadeUp 0.8s ease-out 0.2s forwards";
    bookAI.style.opacity = "0";

    // Decorative elements
    const decorator = document.createElement("div");
    decorator.style.marginTop = "40px";
    decorator.style.width = "60px";
    decorator.style.height = "4px";
    decorator.style.borderRadius = "2px";
    decorator.style.background = "linear-gradient(90deg, #3b82f6, #8b5cf6)";
    decorator.style.animation = "fadeUp 0.8s ease-out 0.4s forwards";
    decorator.style.opacity = "0";

    screen.appendChild(icon);
    screen.appendChild(welcome);
    screen.appendChild(bookAI);
    screen.appendChild(decorator);

    return screen;
}




















//1--- chat-component.js ---test????
function createChatArea() { //main component --- chat area
    const chatArea = document.createElement("div");
    chatArea.style.flex = "1";
    chatArea.style.display = "flex";
    chatArea.style.flexDirection = "column";
    chatArea.style.height = "100%";
    chatArea.style.backgroundColor = "#ffffff";
    
    const messagesArea = createMessagesArea();
    const divider = createDivider();
    const inputPanel = createInputPanel(messagesArea);


    //test 
    const inputPanel2 = createInputPanel2(messagesArea); // Pass messagesArea parameter
    const inputPanel3 = createInputPanel3(messagesArea); // Pass messagesArea parameter
    const inputPanel4 = createInputPanel4(messagesArea); // Pass messagesArea parameter
    const inputPanel5 = createInputPanel5(messagesArea); // Pass messagesArea parameter
    
    chatArea.appendChild(messagesArea);
    chatArea.appendChild(divider);
    // chatArea.appendChild(inputPanel); //FIRST input
    // chatArea.appendChild(inputPanel2); //2
    // chatArea.appendChild(inputPanel3); //3
    // chatArea.appendChild(inputPanel4); //4
    chatArea.appendChild(inputPanel5); //5
    return chatArea;
}

function createMessagesArea() {
    const messagesArea = document.createElement("div");
    messagesArea.style.flex = "1";
    messagesArea.style.overflowY = "auto";
    messagesArea.style.padding = "20px";
    messagesArea.style.scrollBehavior = "smooth";
    
    // Custom scrollbar
    messagesArea.style.scrollbarWidth = "thin";
    messagesArea.style.scrollbarColor = "#cbd5e1 transparent";
    return messagesArea;
}

function createDivider() {
    const divider = document.createElement("div");
    divider.style.height = "1px";
    divider.style.backgroundColor = "#e2e8f0";
    divider.style.margin = "0 20px";
    return divider;
}











//opent new Chat Book

//2---createNewBook chat Area --- new chat area
function createNewBookChatArea() { //  --- chat area
    const chatArea = document.createElement("div");
    chatArea.style.flex = "1";
    chatArea.style.display = "flex";
    chatArea.style.flexDirection = "column";
    chatArea.style.height = "100%";
    chatArea.style.backgroundColor = "#ffffff";
    
    const messagesArea = createMessagesArea();
    const divider = createDivider();
    const inputPanel = createInputPanel(messagesArea);
    
    chatArea.appendChild(messagesArea);
    chatArea.appendChild(divider);
    chatArea.appendChild(inputPanel); 
    return chatArea;
}



















//UI --- //input PANEL ---- FIRST
//text field
function createInputPanel(messagesArea) {
    const panel = document.createElement("div");
    panel.style.paddingTop = "20px";
    panel.style.paddingBottom = "20px";
    panel.style.paddingLeft = "20px";
    panel.style.paddingRight = "40px"; // Increased right padding
    panel.style.backgroundColor = "#f8fafc";
    panel.style.borderTop = "1px solid #e2e8f0";
    panel.style.width = "100%";
    panel.style.boxSizing = "border-box";
    
    const textareaContainer = document.createElement("div");
    textareaContainer.style.marginBottom = "15px";
    textareaContainer.style.width = "100%";
    textareaContainer.style.boxSizing = "border-box";
    
    const textarea = createExpandingTextarea();
    const controlsRow = createControlsRow(messagesArea, textarea);
    
    textareaContainer.appendChild(textarea);
    panel.appendChild(textareaContainer);
    panel.appendChild(controlsRow);
    
    return panel;
}

//text area???
function createExpandingTextarea() {
    const textarea = document.createElement("textarea");
    textarea.placeholder = "Describe your book idea...";
    textarea.style.width = "100%";
    textarea.style.minHeight = "100px";
    textarea.style.maxHeight = "300px";
    textarea.style.padding = "15px";
    textarea.style.borderRadius = "12px";
    textarea.style.border = "1px solid #e2e8f0";
    textarea.style.fontSize = "14px";
    textarea.style.lineHeight = "1.5";
    textarea.style.resize = "none";
    textarea.style.outline = "none";
    textarea.style.transition = "border-color 0.2s ease";
    
    // Auto-expand functionality
    textarea.addEventListener('input', () => {
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
    });
    
    textarea.onmouseover = () => textarea.style.borderColor = "#94a3b8";
    textarea.onmouseout = () => textarea.style.borderColor = "#e2e8f0";
    
    return textarea;
}

function createControlsRow(messagesArea, textarea) {
    const controls = document.createElement("div");
    controls.style.display = "flex";
    controls.style.justifyContent = "space-between";
    controls.style.alignItems = "center";
    controls.style.gap = "15px";
    
    const leftSection = createWordCountSelector();
    const rightSection = createActionButtons(messagesArea, textarea);
    
    controls.appendChild(leftSection);
    controls.appendChild(rightSection);
    return controls;
}

function createWordCountSelector() {
    const container = document.createElement("div");
    container.style.display = "flex";
    container.style.alignItems = "center";
    container.style.gap = "10px";
    
    const label = document.createElement("label");
    label.textContent = "Target word count:";
    label.style.fontSize = "14px";
    label.style.color = "#64748b";
    
    const select = document.createElement("select");
    select.style.padding = "8px 12px";
    select.style.borderRadius = "8px";
    select.style.border = "1px solid #e2e8f0";
    select.style.fontSize = "14px";
    select.style.color = "#1e293b";
    select.style.cursor = "pointer";
    select.style.background = "white";
    
    const wordCounts = [10000, 20000, 30000, 40000, 50000, 60000, 70000, 80000, 90000, 100000];
    
    wordCounts.forEach(count => {
        const option = document.createElement("option");
        option.value = count;
        option.textContent = `${count.toLocaleString()} words`;
        select.appendChild(option);
    });
    
    container.appendChild(label);
    container.appendChild(select);
    return container;
}
//crete BOTTON
function createActionButtons(messagesArea, textarea) {
    const container = document.createElement("div");
    container.style.display = "flex";
    container.style.gap = "10px";
    
    const createPlanBtn = document.createElement("button");
    createPlanBtn.innerHTML = `
        <svg style="width: 16px; height: 16px; margin-right: 8px;" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
        </svg>
        Create Book Plan
    `;
    
    // Base styles
    createPlanBtn.style.padding = "14px 28px";
    createPlanBtn.style.background = "linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%)";
    createPlanBtn.style.color = "white";
    createPlanBtn.style.border = "none";
    createPlanBtn.style.borderRadius = "12px";
    createPlanBtn.style.cursor = "pointer";
    createPlanBtn.style.fontSize = "14px";
    createPlanBtn.style.fontWeight = "600";
    createPlanBtn.style.transition = "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)";
    createPlanBtn.style.boxShadow = "0 4px 12px rgba(59, 130, 246, 0.3)";
    createPlanBtn.style.display = "flex";
    createPlanBtn.style.alignItems = "center";
    createPlanBtn.style.justifyContent = "center";
    createPlanBtn.style.position = "relative";
    createPlanBtn.style.overflow = "hidden";

    // Add pulse animation
    const keyframes = `
        @keyframes pulse {
            0% { box-shadow: 0 0 0 0 rgba(79, 70, 229, 0.4); }
            70% { box-shadow: 0 0 0 10px rgba(79, 70, 229, 0); }
            100% { box-shadow: 0 0 0 0 rgba(79, 70, 229, 0); }
        }
    `;
    const style = document.createElement('style');
    style.textContent = keyframes;
    document.head.appendChild(style);
    
    // Hover effects
    createPlanBtn.onmouseover = () => {
        createPlanBtn.style.background = "linear-gradient(135deg, #4338ca 0%, #2563eb 100%)";
        createPlanBtn.style.transform = "translateY(-2px)";
        createPlanBtn.style.boxShadow = "0 8px 20px rgba(59, 130, 246, 0.4)";
        createPlanBtn.style.animation = "pulse 1.5s infinite";
    };
    
    createPlanBtn.onmouseout = () => {
        createPlanBtn.style.background = "linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%)";
        createPlanBtn.style.transform = "translateY(0)";
        createPlanBtn.style.boxShadow = "0 4px 12px rgba(59, 130, 246, 0.3)";
        createPlanBtn.style.animation = "none";
    };
    
    // Active state
    createPlanBtn.onmousedown = () => {
        createPlanBtn.style.transform = "translateY(1px)";
        createPlanBtn.style.boxShadow = "0 2px 8px rgba(59, 130, 246, 0.2)";
    };
    
    createPlanBtn.onmouseup = () => {
        createPlanBtn.style.transform = "translateY(-2px)";
        createPlanBtn.style.boxShadow = "0 8px 20px rgba(59, 130, 246, 0.4)";
    };
    
    createPlanBtn.onclick = () => {
        if (textarea.value.trim()) {
            addMessage(messagesArea, textarea.value);
            textarea.value = "";
            textarea.style.height = "100px";
        }
    };
    
    container.appendChild(createPlanBtn);
    return container;
}




//UI2
function createInputPanel2(messagesArea) {
    const panel = document.createElement("div");
    panel.style.paddingTop = "20px";
    panel.style.paddingBottom = "20px";
    panel.style.paddingLeft = "20px";
    panel.style.paddingRight = "40px";
    panel.style.backgroundColor = "#f8fafc";
    panel.style.borderTop = "1px solid #e2e8f0";
    panel.style.width = "100%";
    panel.style.boxSizing = "border-box";

    // Header Section
    const header = createGenerationHeader();
    
    // Textarea Container
    const textareaContainer = document.createElement("div");
    textareaContainer.style.marginBottom = "15px";
    textareaContainer.style.width = "100%";
    textareaContainer.style.boxSizing = "border-box";
    
    const textarea = createExpandingTextarea();
    const controlsRow = createControlsRow2(messagesArea, textarea);
    
    textareaContainer.appendChild(textarea);
    panel.appendChild(header);
    panel.appendChild(textareaContainer);
    panel.appendChild(controlsRow);
    
    return panel;
}
//start generate componet
function createGenerationHeader() {
    const header = document.createElement("div");
    header.style.display = "flex";
    header.style.justifyContent = "space-between";
    header.style.alignItems = "center";
    header.style.marginBottom = "24px";
    header.style.padding = "0 4px";
    
    const title = document.createElement("div");
    title.textContent = "Start generating a book";
    title.style.fontSize = "17px";
    title.style.fontWeight = "600";
    title.style.color = "#0f172a";
    title.style.letterSpacing = "-0.01em";
    title.style.background = "linear-gradient(to right, #0f172a, #334155)";
    title.style.webkitBackgroundClip = "text";
    title.style.webkitTextFillColor = "transparent";
    
    const startBtn = document.createElement("button");
    startBtn.innerHTML = `
        <svg style="width: 16px; height: 16px; margin-right: 8px;" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        Start Generation
    `;
    
    startBtn.style.padding = "10px 20px";
    startBtn.style.background = "linear-gradient(135deg, #059669 0%, #10b981 100%)";
    startBtn.style.color = "white";
    startBtn.style.border = "none";
    startBtn.style.borderRadius = "10px";
    startBtn.style.fontSize = "14px";
    startBtn.style.fontWeight = "600";
    startBtn.style.cursor = "pointer";
    startBtn.style.transition = "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)";
    startBtn.style.boxShadow = "0 4px 12px rgba(16, 185, 129, 0.25)";
    startBtn.style.display = "flex";
    startBtn.style.alignItems = "center";
    startBtn.style.letterSpacing = "0.3px";
    
    // Add shine effect
    startBtn.style.position = "relative";
    startBtn.style.overflow = "hidden";
    
    startBtn.onmouseover = () => {
        startBtn.style.transform = "translateY(-2px)";
        startBtn.style.boxShadow = "0 6px 20px rgba(16, 185, 129, 0.35)";
        startBtn.style.background = "linear-gradient(135deg, #047857 0%, #059669 100%)";
    };
    
    startBtn.onmouseout = () => {
        startBtn.style.transform = "translateY(0)";
        startBtn.style.boxShadow = "0 4px 12px rgba(16, 185, 129, 0.25)";
        startBtn.style.background = "linear-gradient(135deg, #059669 0%, #10b981 100%)";
    };
    
    startBtn.onmousedown = () => {
        startBtn.style.transform = "translateY(1px)";
        startBtn.style.boxShadow = "0 2px 8px rgba(16, 185, 129, 0.2)";
    };
    
    header.appendChild(title);
    header.appendChild(startBtn);
    return header;
}

function createControlsRow2(messagesArea, textarea) {
    const controls = document.createElement("div");
    controls.style.display = "flex";
    controls.style.justifyContent = "space-between";
    controls.style.alignItems = "center";
    controls.style.gap = "15px";
    
    const wordCountDisplay = document.createElement("div");
    wordCountDisplay.style.padding = "8px 16px";
    wordCountDisplay.style.backgroundColor = "#f1f5f9";
    wordCountDisplay.style.borderRadius = "8px";
    wordCountDisplay.style.fontSize = "14px";
    wordCountDisplay.style.color = "#64748b";
    wordCountDisplay.style.border = "1px solid #e2e8f0";
    wordCountDisplay.textContent = "50,000 words";
    
    const regenerateBtn = document.createElement("button");
    regenerateBtn.innerHTML = `
        <svg style="width: 16px; height: 16px; margin-right: 8px;" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
        </svg>
        Regenerate
    `;
    
    regenerateBtn.style.padding = "12px 24px";
    regenerateBtn.style.background = "linear-gradient(135deg, #6366f1, #4f46e5)";
    regenerateBtn.style.color = "white";
    regenerateBtn.style.border = "none";
    regenerateBtn.style.borderRadius = "8px";
    regenerateBtn.style.cursor = "pointer";
    regenerateBtn.style.fontSize = "14px";
    regenerateBtn.style.fontWeight = "600";
    regenerateBtn.style.display = "flex";
    regenerateBtn.style.alignItems = "center";
    regenerateBtn.style.transition = "all 0.2s ease";
    regenerateBtn.style.boxShadow = "0 4px 12px rgba(99, 102, 241, 0.2)";
    
    regenerateBtn.onmouseover = () => {
        regenerateBtn.style.transform = "translateY(-1px)";
        regenerateBtn.style.boxShadow = "0 6px 16px rgba(99, 102, 241, 0.3)";
    };
    
    regenerateBtn.onmouseout = () => {
        regenerateBtn.style.transform = "translateY(0)";
        regenerateBtn.style.boxShadow = "0 4px 12px rgba(99, 102, 241, 0.2)";
    };
    
    controls.appendChild(wordCountDisplay);
    controls.appendChild(regenerateBtn);
    return controls;
}







//UI --- 3 LOADING BOOK GENERATE
function createInputPanel3(messagesArea) {
    const panel = document.createElement("div");
    panel.style.padding = "40px";
    panel.style.backgroundColor = "#f8fafc";
    panel.style.borderTop = "1px solid #e2e8f0";
    panel.style.width = "100%";
    panel.style.boxSizing = "border-box";
    panel.style.display = "flex";
    panel.style.flexDirection = "column";
    panel.style.alignItems = "center";
    panel.style.justifyContent = "center";
    panel.style.gap = "24px";

    // Add loading circle animation keyframes
    const keyframes = `
        @keyframes rotate {
            100% { transform: rotate(360deg); }
        }
        @keyframes dash {
            0% { stroke-dasharray: 1, 200; stroke-dashoffset: 0; }
            50% { stroke-dasharray: 89, 200; stroke-dashoffset: -35; }
            100% { stroke-dasharray: 89, 200; stroke-dashoffset: -124; }
        }
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
    `;
    const style = document.createElement('style');
    style.textContent = keyframes;
    document.head.appendChild(style);

    // Create progress circle
    const progressContainer = document.createElement("div");
    progressContainer.style.position = "relative";
    progressContainer.style.width = "120px";
    progressContainer.style.height = "120px";
    progressContainer.style.animation = "pulse 2s ease-in-out infinite";

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 100 100");
    svg.style.width = "100%";
    svg.style.height = "100%";
    svg.style.transform = "rotate(-90deg)";

    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", "50");
    circle.setAttribute("cy", "50");
    circle.setAttribute("r", "45");
    circle.setAttribute("fill", "none");
    circle.setAttribute("stroke", "#e2e8f0");
    circle.setAttribute("stroke-width", "8");

    const progressCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    progressCircle.setAttribute("cx", "50");
    progressCircle.setAttribute("cy", "50");
    progressCircle.setAttribute("r", "45");
    progressCircle.setAttribute("fill", "none");
    progressCircle.setAttribute("stroke", "#3b82f6");
    progressCircle.setAttribute("stroke-width", "8");
    progressCircle.setAttribute("stroke-linecap", "round");
    progressCircle.style.strokeDasharray = `${2 * Math.PI * 45}`;
    progressCircle.style.strokeDashoffset = `${2 * Math.PI * 45}`;
    progressCircle.style.transition = "stroke-dashoffset 0.5s ease";

    svg.appendChild(circle);
    svg.appendChild(progressCircle);
    progressContainer.appendChild(svg);

    // Progress text
    const percentageText = document.createElement("div");
    percentageText.style.position = "absolute";
    percentageText.style.top = "50%";
    percentageText.style.left = "50%";
    percentageText.style.transform = "translate(-50%, -50%)";
    percentageText.style.fontSize = "24px";
    percentageText.style.fontWeight = "600";
    percentageText.style.color = "#1e293b";
    percentageText.style.background = "linear-gradient(135deg, #1e293b 0%, #3b82f6 100%)";
    percentageText.style.webkitBackgroundClip = "text";
    percentageText.style.webkitTextFillColor = "transparent";
    percentageText.textContent = "0%";

    progressContainer.appendChild(percentageText);

    // Status text
    const statusText = document.createElement("div");
    statusText.style.fontSize = "18px";
    statusText.style.fontWeight = "500";
    statusText.style.color = "#0f172a";
    statusText.style.textAlign = "center";
    statusText.innerHTML = `Your book is being generated...<br>
        <span style="font-size: 14px; color: #64748b; font-weight: 400">
            Estimated time: 35 minutes remaining
        </span>`;

    panel.appendChild(progressContainer);
    panel.appendChild(statusText);

    // Simulate progress over 35 minutes
    const duration = 35 * 60 * 1000; // 35 minutes in milliseconds
    const startTime = Date.now();
    
    const updateProgress = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min((elapsed / duration) * 100, 100);
        
        const circumference = 2 * Math.PI * 45;
        const offset = circumference - (progress / 100) * circumference;
        progressCircle.style.strokeDashoffset = offset;
        
        percentageText.textContent = `${Math.round(progress)}%`;
        
        if (progress < 100) {
            requestAnimationFrame(updateProgress);
        }
    };

    requestAnimationFrame(updateProgress);

    return panel;
}











//UI --- 4 
function createInputPanel4(messagesArea) {
    const panel = document.createElement("div");
    panel.style.padding = "40px";
    panel.style.backgroundColor = "#f8fafc";
    panel.style.borderTop = "1px solid #e2e8f0";
    panel.style.width = "100%";
    panel.style.boxSizing = "border-box";
    panel.style.display = "flex";
    panel.style.flexDirection = "column";
    panel.style.alignItems = "center";
    panel.style.justifyContent = "center";
    panel.style.gap = "24px";

    // Success message
    const message = document.createElement("div");
    message.style.fontSize = "24px";
    message.style.fontWeight = "600";
    message.style.color = "#0f172a";
    message.style.textAlign = "center";
    message.style.background = "linear-gradient(135deg, #0f172a 0%, #3b82f6 100%)";
    message.style.webkitBackgroundClip = "text";
    message.style.webkitTextFillColor = "transparent";
    message.textContent = "Your book is ready";
    message.style.animation = "fadeIn 0.5s ease-out";

    // Download button
    const downloadBtn = document.createElement("button");
    downloadBtn.innerHTML = `
        <svg style="width: 20px; height: 20px; margin-right: 12px;" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
        </svg>
        Download Book
    `;
    
    downloadBtn.style.display = "flex";
    downloadBtn.style.alignItems = "center";
    downloadBtn.style.justifyContent = "center";
    downloadBtn.style.padding = "16px 32px";
    downloadBtn.style.fontSize = "16px";
    downloadBtn.style.fontWeight = "600";
    downloadBtn.style.color = "white";
    downloadBtn.style.backgroundColor = "#3b82f6";
    downloadBtn.style.border = "none";
    downloadBtn.style.borderRadius = "12px";
    downloadBtn.style.cursor = "pointer";
    downloadBtn.style.transition = "all 0.3s ease";
    downloadBtn.style.boxShadow = "0 4px 12px rgba(59, 130, 246, 0.25)";
    downloadBtn.style.background = "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)";
    downloadBtn.style.animation = "fadeIn 0.5s ease-out 0.2s backwards";

    // Add keyframes
    const keyframes = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
    `;
    const style = document.createElement('style');
    style.textContent = keyframes;
    document.head.appendChild(style);

    // Button hover effects
    downloadBtn.onmouseover = () => {
        downloadBtn.style.transform = "translateY(-2px)";
        downloadBtn.style.boxShadow = "0 8px 20px rgba(59, 130, 246, 0.35)";
        downloadBtn.style.background = "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)";
        downloadBtn.style.animation = "pulse 2s ease-in-out infinite";
    };

    downloadBtn.onmouseout = () => {
        downloadBtn.style.transform = "translateY(0)";
        downloadBtn.style.boxShadow = "0 4px 12px rgba(59, 130, 246, 0.25)";
        downloadBtn.style.background = "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)";
        downloadBtn.style.animation = "none";
    };

    downloadBtn.onclick = () => {
        // Add download functionality here
        console.log("Downloading book...");
    };

    panel.appendChild(message);
    panel.appendChild(downloadBtn);

    return panel;
}




//UI5
function createInputPanel5(messagesArea) {
    const panel = document.createElement("div");
    panel.style.padding = "40px";
    panel.style.backgroundColor = "#f8fafc";
    panel.style.borderTop = "1px solid #e2e8f0";
    panel.style.width = "100%";
    panel.style.boxSizing = "border-box";
    panel.style.display = "flex";
    panel.style.flexDirection = "column";
    panel.style.alignItems = "center";
    panel.style.justifyContent = "center";
    panel.style.gap = "20px";

    // Error icon
    const icon = document.createElement("div");
    icon.innerHTML = `
        <svg style="width: 40px; height: 40px; color: #ef4444;" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
    `;
    icon.style.marginBottom = "8px";

    // Error message
    const message = document.createElement("div");
    message.style.fontSize = "20px";
    message.style.fontWeight = "600";
    message.style.color = "#ef4444";
    message.style.textAlign = "center";
    message.textContent = "Generation Error Due to High Load";

    // Sub-message
    const subMessage = document.createElement("div");
    subMessage.style.fontSize = "15px";
    subMessage.style.color = "#64748b";
    subMessage.style.textAlign = "center";
    subMessage.style.maxWidth = "400px";
    subMessage.textContent = "Your book generation was paused, but you can continue the process";

    // Continue button
    const continueBtn = document.createElement("button");
    continueBtn.innerHTML = `
        <svg style="width: 18px; height: 18px; margin-right: 10px;" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        Continue Generation
    `;

    continueBtn.style.display = "flex";
    continueBtn.style.alignItems = "center";
    continueBtn.style.justifyContent = "center";
    continueBtn.style.marginTop = "10px";
    continueBtn.style.padding = "14px 28px";
    continueBtn.style.fontSize = "15px";
    continueBtn.style.fontWeight = "600";
    continueBtn.style.color = "white";
    continueBtn.style.backgroundColor = "#3b82f6";
    continueBtn.style.border = "none";
    continueBtn.style.borderRadius = "10px";
    continueBtn.style.cursor = "pointer";
    continueBtn.style.transition = "all 0.3s ease";
    continueBtn.style.background = "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)";
    continueBtn.style.boxShadow = "0 4px 12px rgba(59, 130, 246, 0.25)";

    continueBtn.onmouseover = () => {
        continueBtn.style.transform = "translateY(-2px)";
        continueBtn.style.boxShadow = "0 8px 16px rgba(59, 130, 246, 0.35)";
        continueBtn.style.background = "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)";
    };

    continueBtn.onmouseout = () => {
        continueBtn.style.transform = "translateY(0)";
        continueBtn.style.boxShadow = "0 4px 12px rgba(59, 130, 246, 0.25)";
        continueBtn.style.background = "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)";
    };

    panel.appendChild(icon);
    panel.appendChild(message);
    panel.appendChild(subMessage);
    panel.appendChild(continueBtn);

    return panel;
}















































function addMessage(messagesArea, text) { // to CHAT component
    const message = document.createElement("div");
    message.style.padding = "15px";
    message.style.backgroundColor = "#f8fafc";
    message.style.borderRadius = "12px";
    message.style.marginBottom = "15px";
    message.style.border = "1px solid #e2e8f0";
    message.style.fontSize = "14px";
    message.style.lineHeight = "1.5";
    message.textContent = text;
    
    messagesArea.appendChild(message);
    messagesArea.scrollTop = messagesArea.scrollHeight;
}

















// main-container.js
// function createMainContainer() {
//     const container = document.createElement("div");
//     container.style.display = "flex";
//     container.style.height = "calc(100vh - 60px)";
    
//     const sidebar = createSidebar();

//     const chatAreaInitial = createInitialScreen(); //start Screen  
//     const newChatArea = createInitialScreen(); //createInitialScreen ---botton Create New Book ???
//     const bookDataChatArea = createInitialScreen(); //createInitialScreen ---botton Create New Book ???

    
//     container.appendChild(sidebar);
//     container.appendChild(chatAreaInitial);

//     return container;
// }
function createMainContainer() {
    const container = document.createElement("div");
    container.style.display = "flex";
    container.style.height = "calc(100vh - 60px)";
    
    const sidebar = createSidebar();

    // Контейнер для области чата
    const chatAreaContainer = document.createElement("div");
    chatAreaContainer.id = "chat-area-container";
    chatAreaContainer.style.flex = "1";
    chatAreaContainer.style.display = "flex"; 
    chatAreaContainer.style.flexDirection = "column";
    chatAreaContainer.style.height = "100%"; // Устанавливаем высоту, чтобы не сжималось

    // Загружаем начальный экран по умолчанию
    chatAreaContainer.appendChild(createInitialScreen());

    container.appendChild(sidebar);
    container.appendChild(chatAreaContainer);

    return container;
}
















// // app.js
// document.addEventListener("DOMContentLoaded", () => {
//     document.body.style.margin = "0";
//     document.body.style.padding = "0";
//     document.body.style.overflowX = "hidden";
//     document.body.style.fontFamily = "Arial, sans-serif";

//     const navbar = createNavbar();
//     const mainContainer = createMainContainer();

//     document.body.appendChild(navbar);
//     document.body.appendChild(mainContainer);
// });



//first variant
// function createMainLoadingIndicator() {
//     const container = document.createElement("div");
//     container.style.width = "100%";
//     container.style.height = "6px";
//     container.style.backgroundColor = "#1a1a1a";
//     container.style.position = "fixed";
//     container.style.top = "0";
//     container.style.left = "0";
//     container.style.overflow = "hidden";
//     container.style.zIndex = "9999";

//     const keyframes = `
//         @keyframes moveCircle {
//             0% { 
//                 left: -20px;
//                 transform: scale(1);
//             }
//             50% { 
//                 transform: scale(1.5);
//             }
//             100% { 
//                 left: calc(100% + 20px);
//                 transform: scale(1);
//             }
//         }
        
//         @keyframes trailEffect {
//             0% { 
//                 width: 0;
//                 opacity: 1;
//                 transform: translateX(-100%);
//             }
//             100% { 
//                 width: 100%;
//                 opacity: 0.3;
//                 transform: translateX(0);
//             }
//         }
        
//         @keyframes glowPulse {
//             0% { opacity: 0.3; }
//             50% { opacity: 1; }
//             100% { opacity: 0.3; }
//         }
        
//         @keyframes sparkle {
//             0%, 100% { transform: scale(0); opacity: 0; }
//             50% { transform: scale(1); opacity: 1; }
//         }
//     `;

//     const style = document.createElement('style');
//     style.textContent = keyframes;
//     document.head.appendChild(style);

//     // Основное свечение
//     const glow = document.createElement("div");
//     glow.style.position = "absolute";
//     glow.style.top = "0";
//     glow.style.left = "0";
//     glow.style.width = "100%";
//     glow.style.height = "100%";
//     glow.style.background = "linear-gradient(90deg, #ff00ff, #00ffff)";
//     glow.style.animation = "glowPulse 2s ease-in-out infinite";
//     glow.style.filter = "blur(2px)";

//     // Движущийся шарик
//     const circle = document.createElement("div");
//     circle.style.position = "absolute";
//     circle.style.width = "15px";
//     circle.style.height = "15px";
//     circle.style.borderRadius = "50%";
//     circle.style.backgroundColor = "#fff";
//     circle.style.top = "-4.5px";
//     circle.style.left = "-20px";
//     circle.style.boxShadow = "0 0 15px #fff, 0 0 30px #ff00ff";
//     circle.style.animation = "moveCircle 1.5s cubic-bezier(0.4, 0, 0.2, 1) infinite";
//     circle.style.zIndex = "2";

//     // След за шариком
//     const trail = document.createElement("div");
//     trail.style.position = "absolute";
//     trail.style.height = "100%";
//     trail.style.width = "100%";
//     trail.style.background = "linear-gradient(90deg, transparent, #ff00ff, #00ffff, transparent)";
//     trail.style.animation = "trailEffect 1.5s cubic-bezier(0.4, 0, 0.2, 1) infinite";
//     trail.style.zIndex = "1";

//     // Искры
//     for (let i = 0; i < 5; i++) {
//         const sparkle = document.createElement("div");
//         sparkle.style.position = "absolute";
//         sparkle.style.width = "4px";
//         sparkle.style.height = "4px";
//         sparkle.style.borderRadius = "50%";
//         sparkle.style.backgroundColor = "#fff";
//         sparkle.style.boxShadow = "0 0 10px #fff";
//         sparkle.style.left = `${20 + i * 20}%`;
//         sparkle.style.top = "1px";
//         sparkle.style.animation = `sparkle ${1 + i * 0.2}s ease-in-out infinite`;
//         sparkle.style.zIndex = "3";
//         container.appendChild(sparkle);
//     }

//     container.appendChild(glow);
//     container.appendChild(trail);
//     container.appendChild(circle);

//     container.startLoading = () => {
//         container.style.display = "block";
//     };

//     container.stopLoading = () => {
//         container.style.display = "none";
//     };

//     return container;
// }




// // Usage in app.js
// document.addEventListener("DOMContentLoaded", () => {
//     document.body.style.margin = "0";
//     document.body.style.padding = "0";
//     document.body.style.overflowX = "hidden";
//     document.body.style.fontFamily = "Arial, sans-serif";

//     const navbar = createNavbar();
//     const loadingIndicator = createMainLoadingIndicator();
//     const mainContainer = createMainContainer();

//     document.body.appendChild(navbar);
//     document.body.appendChild(loadingIndicator);
//     document.body.appendChild(mainContainer);

//     // Start loading animation immediately for testing
//     loadingIndicator.startLoading();
// });



function createMainLoadingIndicator() {
    const container = document.createElement("div");
    container.style.width = "100%";
    container.style.height = "6px";
    container.style.backgroundColor = "#1a1a1a";
    // Меняем position: fixed на relative
    container.style.position = "relative";
    // Убираем top: 0 и left: 0, так как они больше не нужны
    container.style.overflow = "hidden";
    container.style.zIndex = "9999";
    // Добавляем отступы
    container.style.margin = "0";
    container.style.display = "none"; // Скрыто по умолчанию

    const keyframes = `
        @keyframes moveCircle {
            0% { 
                left: -20px;
                transform: scale(1);
            }
            50% { 
                transform: scale(1.5);
            }
            100% { 
                left: calc(100% + 20px);
                transform: scale(1);
            }
        }
        
        @keyframes trailEffect {
            0% { 
                width: 0;
                opacity: 1;
                transform: translateX(-100%);
            }
            100% { 
                width: 100%;
                opacity: 0.3;
                transform: translateX(0);
            }
        }
        
        @keyframes glowPulse {
            0% { opacity: 0.3; }
            50% { opacity: 1; }
            100% { opacity: 0.3; }
        }
        
        @keyframes sparkle {
            0%, 100% { transform: scale(0); opacity: 0; }
            50% { transform: scale(1); opacity: 1; }
        }
    `;

    const style = document.createElement('style');
    style.textContent = keyframes;
    document.head.appendChild(style);

    // Основное свечение
    const glow = document.createElement("div");
    glow.style.position = "absolute";
    glow.style.top = "0";
    glow.style.left = "0";
    glow.style.width = "100%";
    glow.style.height = "100%";
    glow.style.background = "linear-gradient(90deg, #ff00ff, #00ffff)";
    glow.style.animation = "glowPulse 2s ease-in-out infinite";
    glow.style.filter = "blur(2px)";

    // Движущийся шарик
    const circle = document.createElement("div");
    circle.style.position = "absolute";
    circle.style.width = "15px";
    circle.style.height = "15px";
    circle.style.borderRadius = "50%";
    circle.style.backgroundColor = "#fff";
    circle.style.top = "-4.5px";
    circle.style.left = "-20px";
    circle.style.boxShadow = "0 0 15px #fff, 0 0 30px #ff00ff";
    circle.style.animation = "moveCircle 1.5s cubic-bezier(0.4, 0, 0.2, 1) infinite";
    circle.style.zIndex = "2";

    // След за шариком
    const trail = document.createElement("div");
    trail.style.position = "absolute";
    trail.style.height = "100%";
    trail.style.width = "100%";
    trail.style.background = "linear-gradient(90deg, transparent, #ff00ff, #00ffff, transparent)";
    trail.style.animation = "trailEffect 1.5s cubic-bezier(0.4, 0, 0.2, 1) infinite";
    trail.style.zIndex = "1";

    // Искры
    for (let i = 0; i < 5; i++) {
        const sparkle = document.createElement("div");
        sparkle.style.position = "absolute";
        sparkle.style.width = "4px";
        sparkle.style.height = "4px";
        sparkle.style.borderRadius = "50%";
        sparkle.style.backgroundColor = "#fff";
        sparkle.style.boxShadow = "0 0 10px #fff";
        sparkle.style.left = `${20 + i * 20}%`;
        sparkle.style.top = "1px";
        sparkle.style.animation = `sparkle ${1 + i * 0.2}s ease-in-out infinite`;
        sparkle.style.zIndex = "3";
        container.appendChild(sparkle);
    }

    container.appendChild(glow);
    container.appendChild(trail);
    container.appendChild(circle);

    container.startLoading = () => {
        container.style.display = "block";
    };

    container.stopLoading = () => {
        container.style.display = "none";
    };

    return container;
}

// Пример использования в app.js
document.addEventListener("DOMContentLoaded", () => {
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.overflowX = "hidden";
    document.body.style.fontFamily = "Arial, sans-serif";

    const navbar = createNavbar();
    const loadingIndicator = createMainLoadingIndicator();
    const mainContainer = createMainContainer();

    document.body.appendChild(navbar);
    document.body.appendChild(loadingIndicator);
    document.body.appendChild(mainContainer);

    // Тест загрузки
    loadingIndicator.startLoading();
});












// // Update your existing DOMContentLoaded listener
// document.addEventListener("DOMContentLoaded", () => {
//     document.body.style.margin = "0";
//     document.body.style.padding = "0";
//     document.body.style.overflowX = "hidden";
//     document.body.style.fontFamily = "Arial, sans-serif";

//     initializeApp();
// });




