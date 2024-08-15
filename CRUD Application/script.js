var selectedRow = null;

function showAlert(message, className){
    const div = document.createElement("div");
    div.className = 'alert alert-${className}';

    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const main = document.querySelector(".main");
    container.insertBefore(div, main);

    setTimeout(() => document.querySelector(".alert").remove(), 3000);
}


function clearFields(){
    document.querySelector("#Name").value = "";
    document.querySelector("#jobTitle").value = "";
    document.querySelector("#idNo").value = "";
}

document.querySelector("#employee-form").addEventListener("submit", (e) =>{
    e.preventDefault();

    const Name = document.querySelector("#Name").value;
    const jobTitle = document.querySelector("#jobTitle").value;
    const idNo = document.querySelector("#idNo").value;


    if(Name == "" || jobTitle == "" || idNo == ""){
        showAlert("Please fill in all fields", "danger");
    }
    else{
        if(selectedRow == null){
            const list = document.querySelector("#employee-list");
            const row = document.createElement("tr");

            row.innerHTML = `
            <td>${Name}</td>
            <td>${jobTitle}</td>
            <td>${idNo}</td>
            <td>
                <a href="#" class="btn btn-warning btn-sm edit">Update</a>
                <a href="#" class="btn btn-danger btn-sm delete">Delete</a>
            `;
            list.appendChild(row);
            selectedRow = null;
            showAleart("Employee Added", "success");
            
         }
         else{
            selectedRow.children[0].textContent = Name;
            selectedRow.children[1].textContent = jobTitle;
            selectedRow.children[2].textContent = idNo;
            selectedRow = null;
            showAlert("Employee Info Edited", "info");

         }
         clearFields();
    }
});


document.querySelector("#employee-list").addEventListener("click",(e) =>{
    target = e.target;
    if(target.classList.contains("edit")){
        selectedRow = target.parentElement.parentElement;
        document.querySelector("#Name").value = selectedRow.children[0].textContent;
        document.querySelector("#jobTitle").value = selectedRow.children[1].textContent;
        document.querySelector("#idNo").value = selectedRow.children[2].textContent;
    }
});


document.querySelector("#employee-list").addEventListener("click",(e) =>{
    target = e.target;
    if(target.classList.contains("delete")){
        target.parentElement.parentElement.remove();
        showAlert("Employee Data Deleted", "danger");
    }
});

