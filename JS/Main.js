let link = document.createElement('link');
link.rel = 'stylesheet';
link.href = './CSS/CardForm1.css';
document.head.appendChild(link);

let link1 = document.createElement('link');
link1.rel = 'stylesheet';
link1.href = './CSS/CardForm2.css';
document.head.appendChild(link1);

let link2 = document.createElement('link');
link2.rel = 'stylesheet';
link2.href = './CSS/CardForm3.css';
document.head.appendChild(link2);

function loadHeader() {
    const headerContainer = document.getElementById('header-container');
    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            headerContainer.innerHTML = data;
        });
}

window.onload = function() {
    loadHeader();
    loadContent(); 
};

const jsonData = {
    "category": "Course",
    "commitment": "4 hours",
    "description": "<p>Have you ever thought, Pareto's Law can be applied to cooking? Your thinking starts when you start thinking beyond your thinking.</p><p>Let's prepare Sandwiches, we will use Pareto&rsquo;s Law. That&rsquo;s an 80-20 approach...</p>",
    "learning_outcomes": [
        "Bare minimum knowledge of project management",
        "4SA Concept",
        "Would be able to handle any project efficiently"
    ],
    "tasks": [
        {
            "task_id": 18882,
            "task_title": "Explore the world of management",
            "task_description": "As a project manager, you play an important role in leading a project through initiation, planning, execution, monitoring, controlling and completion. How? Do you want to manage each and every step of your life?",
            "assets": [
                {
                    "asset_id": 18883,
                    "asset_title": "Technical Project Management",
                    "asset_description": "Story of Alignment...",
                    "asset_content": "https://www.youtube.com/embed/TiMRwri1xJ8",
                    "asset_type": "display_asset",
                    "asset_content_type": "video"
                },
                {
                    "asset_id": 18884,
                    "asset_title": "Threadbuild",
                    "asset_description": "Watch the video and thread build...",
                    "asset_content": "",
                    "asset_type": "input_asset",
                    "asset_content_type": "threadbuilder"
                },
                {
                    "asset_id": 18885,
                    "asset_title": "Structure your pointers",
                    "asset_description": "Write a 400-500 word article...",
                    "asset_content": "",
                    "asset_type": "input_asset",
                    "asset_content_type": "article"
                },
                {
                    "asset_id": 18886,
                    "asset_title": "4SA Method",
                    "asset_description": "To explore more read more",
                    "asset_content": "https://dtthon.deepthought.education/sharer?id=01aa3cff-db8e-8d9d-afc0-1671715937878",
                    "asset_type": "display_asset",
                    "asset_content_type": "article"
                }
            ]
        }
    ]
};

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('collapsed');

    const arrowIcon = document.querySelector('#sidebarHead .toggle-btn i');
    if (sidebar.classList.contains('collapsed')) {
        arrowIcon.classList.remove('fa-arrow-left');
        arrowIcon.classList.add('fa-arrow-right');
    } else {
        arrowIcon.classList.remove('fa-arrow-right');
        arrowIcon.classList.add('fa-arrow-left');
    }

    updateTaskTitles();
}

function updateTaskTitles() {
    const taskList = document.getElementById('taskList');
    const collapsed = document.getElementById('sidebar').classList.contains('collapsed');
    const tasks = document.querySelectorAll('.task-item');

    tasks.forEach((task, index) => {
        const taskTitle = task.querySelector('.task-title');
        const assetList = task.querySelector('ul');

        if (collapsed) {
            taskTitle.innerHTML = `${index + 1}`;
            taskTitle.style.display = 'inline-block';
            if (assetList) {
                assetList.style.display = 'none';
            }
        } else {
            taskTitle.innerHTML = `<strong>${task.querySelector('.task-title').getAttribute('data-original-title')}</strong>`;
            taskTitle.style.display = 'inline-block';
            if (assetList) {
                assetList.style.display = 'block';
            }
        }
    });
}

function loadContent() {
    const shortDescription = document.getElementById('shortDescription');
    const grid = document.getElementById('grid');
    const taskList = document.getElementById('taskList');

    if (jsonData.tasks.length > 0) {
        const task = jsonData.tasks[0]; 
        shortDescription.innerHTML = `<strong>${task.task_title}</strong><p> ${task.task_description}</p>`;
    }

    jsonData.tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.classList.add('task-item');

        const taskTitle = document.createElement('span');
        taskTitle.classList.add('task-title');
        taskTitle.setAttribute('data-original-title', task.task_title); 
        taskTitle.innerHTML = `<strong>${task.task_title}</strong>`;

        li.appendChild(taskTitle);

        const assetList = document.createElement('ul');
        task.assets.forEach(asset => {
            const assetLi = document.createElement('li');
            assetLi.textContent = asset.asset_title;
            assetList.appendChild(assetLi);
        });

        li.appendChild(assetList);
        taskList.appendChild(li);

        task.assets.forEach((asset, assetIndex) => {
            // Create card container
            const card = document.createElement('div');
            card.className = 'card';

            // Create title container
            const titleContainer = document.createElement('div');
            titleContainer.className = 'title-container';

            // Add title and info icon
            titleContainer.innerHTML = `
                <h2>${asset.asset_title}</h2>
                <span class="info-icon">i</span>
            `;

            // Create description paragraph (initially hidden)
            const descriptionParagraph = document.createElement('p');
            descriptionParagraph.className = 'description hidden';
            descriptionParagraph.textContent = asset.asset_description;

            // Add toggle functionality to info icon
            titleContainer.querySelector('.info-icon').addEventListener('click', (event) => {
                event.stopPropagation(); // Prevent any unwanted bubbling
                descriptionParagraph.classList.toggle('hidden');
            });

            
            card.appendChild(titleContainer);
            card.appendChild(descriptionParagraph);

            // Display content based on asset content type
            if (asset.asset_content_type === 'video') {
                const videoContainer = document.createElement('div');
                videoContainer.className = 'video-container';
                videoContainer.innerHTML = `
                    <iframe src="${asset.asset_content}" frameborder="0" allowfullscreen></iframe>
                `;
                card.appendChild(videoContainer);
            }

            if (asset.asset_content_type === 'article') {
                const link = document.createElement('a');
                link.href = asset.asset_content;
                link.target = '_blank';
                link.textContent = 'Read More';
                card.appendChild(link);
            }

           //create cards
            let formContainer = document.createElement('form');
            formContainer.className = 'asset-form';

           
            if (assetIndex === 1) { 
                if (!document.querySelector('link[href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"]')) {
                    const link = document.createElement('link');
                    link.rel = 'stylesheet';
                    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css';
                    document.head.appendChild(link);
                }
            
                formContainer.innerHTML = `
                    <div class="threadTitle"><h2> Thread A </h2></div>  
                    <div class="form-group sub-threads-container">
                        <div class="inputs">
                            <label>Sub thread 1</label>
                            <textarea class="input-field" placeholder="Enter Text here"></textarea>
                        </div>
                        <div class="inputs">
                            <label>Sub Interpretation 1</label>
                            <textarea class="input-field" placeholder="Enter Text here"></textarea>
                        </div>
                    </div>
                    <div class="form-group" id="drop">
                        <div class="icons-wrapper">
                            <i class="fas fa-lightbulb"></i> <!-- Blub Icon -->
                            <i class="fas fa-comment-alt"></i> <!-- Message Icon -->
                            <i class="fas fa-question-circle"></i> <!-- Message Question Mark Icon -->
                            <i class="fas fa-leaf"></i> <!-- 3-Leaf Icon -->
                        </div>
                        <div class="dropdown-wrapper">
                            <select class="input-field">
                                <option>Select Categ</option>
                                <option>Category 1</option>
                                <option>Category 2</option>
                            </select>
                        </div>
                        <div class="dropdown-wrapper">
                            <select class="input-field">
                                <option>Select Proces</option>
                                <option>Process 1</option>
                                <option>Process 2</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <button type="button" class="add-thread-btn">+ Sub-thread</button>
                    </div>
                    <div class="form-group">
                        <div class="inputs1">
                            <label>Summary for Thread A</label>
                            <textarea class="input-field" placeholder="Enter Text Here"></textarea>
                        </div>
                    </div>
                `;
            
                // Add event listener - "Add Sub-thread" button
                const addThreadBtn = formContainer.querySelector('.add-thread-btn');
                const subThreadsContainer = formContainer.querySelector('.sub-threads-container');
                const dropContainer = formContainer.querySelector('#drop'); // Select the dropdown container
            
                addThreadBtn.addEventListener('click', () => {
                    const subThreadDiv = document.createElement('div');
                    subThreadDiv.innerHTML = `
                       <div class="form-group sub-threads-container">
                        <div class="inputs">
                            <label>Sub thread 1</label>
                            <textarea class="input-field" placeholder="Enter Text here"></textarea>
                        </div>
                        <div class="inputs">
                            <label>Sub Interpretation 1</label>
                            <textarea class="input-field" placeholder="Enter Text here"></textarea>
                        </div>
                    </div>
                    <div class="form-group" id="drop">
                        <div class="icons-wrapper">
                            <i class="fas fa-lightbulb"></i> <!-- Blub Icon -->
                            <i class="fas fa-comment-alt"></i> <!-- Message Icon -->
                            <i class="fas fa-question-circle"></i> <!-- Message Question Mark Icon -->
                            <i class="fas fa-leaf"></i> <!-- 3-Leaf Icon -->
                        </div>
                        <div class="dropdown-wrapper">
                            <select class="input-field">
                                <option>Select Categ</option>
                                <option>Category 1</option>
                                <option>Category 2</option>
                            </select>
                        </div>
                        <div class="dropdown-wrapper">
                            <select class="input-field">
                                <option>Select Proces</option>
                                <option>Process 1</option>
                                <option>Process 2</option>
                            </select>
                        </div>
                    </div>
                    `;
                    
                    dropContainer.insertAdjacentElement('afterend', subThreadDiv);
                });
            }
           else if (assetIndex === 2) {
            const formContainer = document.createElement('div');
            formContainer.classList.add('card', 'card-editor');
            formContainer.style.padding = '20px';
            formContainer.style.fontFamily = 'Arial, sans-serif';
            formContainer.style.margin = '20px 0';
        
            formContainer.innerHTML = `
            <div>
               <label for="title" class="editor-title-label">Title</label>
                <input type="text" id="editor-title" class="editor-input-field" >

                <label for="content" class="editor-content-label">Content</label>
                <div id="editor-content" class="editor-content-editor" contenteditable="true">
                  <!-- Toolbar -->
                <div class="editor-toolbar">
                <button class="editor-toolbar-btn">File</button>
                <button class="editor-toolbar-btn">Edit</button>
                <button class="editor-toolbar-btn">View</button>
                <button class="editor-toolbar-btn">Insert</button>
                  <button class="editor-toolbar-btn">Format</button>
                  <br>
                   <button class="editor-toolbar-btn">
        <i class="fas fa-undo"></i> 
    </button>
    <button class="editor-toolbar-btn">
        <i class="fas fa-redo"></i> 
    </button>
    <button class="editor-toolbar-btn">
        <i class="fas fa-expand"></i> 
    </button>
    <button class="editor-toolbar-btn1">Paragraph</button>
    <button class="editor-toolbar-btn">
        <i class="fas fa-ellipsis-h"></i>
    </button>
                </div>
                <!-- Content Area -->
               <div class="editor-content-area" placeholder="Enter Content Here"></div>
                </div>
                </div>
            `;
    
    card.appendChild(formContainer);
}
else if (assetIndex === 3) {
    const formContainer = document.createElement('div');
    formContainer.classList.add('card', 'card-editor');
    formContainer.style.padding = '20px';
    formContainer.style.fontFamily = 'Arial, sans-serif';
    formContainer.style.margin = '20px 0';

    formContainer.innerHTML = `
        <div class="thread-history">
            <!-- Down Arrow to show content -->
             <button class="arrow-btn up-arrow" aria-label="Hide Content" style="display: none;">^</button>
            <button class="arrow-btn down-arrow" aria-label="Show Content">v</button>
            <label for="thread" class="thread-intro">Introduction</label>
        </div>
        <div class="intro-answer" style="display: none;">
            <p>The 4SA Method, How to bring an idea into progress?</p>
            <span class="seemore">See More</span>
            <!-- Up Arrow to hide content -->
        </div>
        
    `;

 
    card.appendChild(formContainer);

    const downArrow = formContainer.querySelector('.down-arrow');
    const upArrow = formContainer.querySelector('.up-arrow');
    const introAnswer = formContainer.querySelector('.intro-answer');
    const seeMore = formContainer.querySelector('.seemore');

    downArrow.addEventListener('click', () => {
        introAnswer.style.display = 'block'; 
        downArrow.style.display = 'none'; 
        upArrow.style.display = 'inline-block'; 
    });

    upArrow.addEventListener('click', () => {
        introAnswer.style.display = 'none';
        downArrow.style.display = 'inline-block'; 
        upArrow.style.display = 'none'; 
    });

    
    seeMore.addEventListener('click', () => {
        introAnswer.style.display = 'block'; 
        downArrow.style.display = 'none'; 
        upArrow.style.display = 'inline-block';
    });
}

            card.appendChild(formContainer);

            grid.appendChild(card);
        });
    });

    updateTaskTitles();
}
