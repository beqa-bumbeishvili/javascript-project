(function () {
    var firstnameInput = document.getElementById('firstname');
    var lastnameInput = document.getElementById('lastname');
    var btnSubmit = document.getElementById('btnSubmit');
    var container = document.getElementById('container');

    var names = [];

    httpGetPromise("https://jsonplaceholder.typicode.com/posts");

 function httpGetPromise(url) {
        return new Promise(function (resolve, reject) {
            var request = new XMLHttpRequest();

            request.addEventListener('load', function () {
                if (request.status === 200) {
                    var result = JSON.parse(request.responseText);
                    for (var i=0; i < result.length; i++)
                        names.push(result[i]);
                 drawRows();       
                }
                else {
                    reject({
                        status: request.status,
                        error: JSON.parse(request.responseText)
                    });
                }
            });

            request.open('GET', url);
            request.send();
        });
}

    

    function drawRows() {
        container.innerHTML = '';
        names.forEach(function (name) {
            var tr = document.createElement('tr');
            container.appendChild(tr);

            var td1 = document.createElement('td');
            td1.innerText = name.id;
            tr.appendChild(td1);

            var td2 = document.createElement('td');
            td2.innerText = name.title;
            tr.appendChild(td2);

            var td3 = document.createElement('td');
            tr.appendChild(td3);

            var editBtn = document.createElement('button');
            editBtn.innerText = 'რედაქტირება';
            editBtn.className += 'btn btn-info'
            td3.appendChild(editBtn);

            editBtn.addEventListener('click', function () {
                editRow(name);
            });            

            var deleteBtn = document.createElement('button');
            deleteBtn.innerText = 'წაშლა';
            deleteBtn.className += 'btn btn-danger'
            td3.appendChild(deleteBtn);

            deleteBtn.addEventListener('click', function () {
                names.splice(names.indexOf(name), 1);
                drawRows();
            });

        });
    }

    var editingName;

    function editRow(name) {
        firstnameInput.value = name.id;
        lastnameInput.value = name.title;
        btnSubmit.innerText = 'რედაქტირება';
        editingName = name;
    }

    btnSubmit.addEventListener('click', function () {
        if (editingName) {
            editingName.id = firstnameInput.value;
            firstnameInput.value = null;

            editingName.title = lastnameInput.value;
            lastnameInput.value = null;

            editingName = null;
            btnSubmit.innerText = 'დამატება';
        }
        else {
            names.push({
                firstname: firstnameInput.value,
                lastname: lastnameInput.value
            });

            firstnameInput.value = null;
            lastnameInput.value = null;
        }

        drawRows();
    });
})();
