function dataTemplate(data) {
    const listsPrg = $('.listsPrg')
    const users = data 
    let row = ""
    
    if (users.length > 0) {
        for (const index in users) {
            if (users.hasOwnProperty(index)) {
                const user = users[index]
                
                row +=
                `
                <div class="row mb-4">
                    <div class="col-12 col-md-6">
                        <div class="prgName"><h4 style="font-weight:bold">${user.name}</h4></div>
                        <div class="divide"></div>
                        <div class="prgSkill py-2"><span>${ (user.skills !== null) ? user.skills : "" }</span></div>
                    </div>
                    <div class="col-12 col-md-6">
                        <form action="javascript:void(0)">
                            <div class="input-group mb-3">
                                <input type="text" class="form-control" placeholder="Tambah Skills...">
                                <div class="input-group-append">
                                    <input type="submit" class="btn btn-outline-primary addSkills" data-id="${user.id}"value="Tambah">
                                    <button class="btn btn-outline-danger deletePrg" type="button" data-id="${user.id}">Hapus</button>
                            </div>
                            </div>
                        </form>
                    </div>
                </div>
                `
            }
        }
    }else{
        row = "<h1 class='null'>(>_<)</h1>"
    }
    listsPrg.html(row)
}

getData()
function getData() {
    $.ajax({
        url: 'api/crud.php',
        method: 'GET'
    }).done(res => {
        dataTemplate(res)
    })
}
// load data=======================

function addPrg(newPrg) {
    $.ajax({
        url: 'api/crud.php',
        method: 'POST',
        data: {
            prg_name: newPrg
        }
    }).done(data => {
        if (data) {
            $('#newPrg').val("")
            getData()
        }
    })
}
function deletePrg(id) {
    $.ajax({
        url: 'api/crud.php?id=' + id,
        method: 'DELETE',
    }).done(data => {
        if (data) {
            $("#forModal").modal('hide')
            getData()
        }
    })
}

function addSkills(skills, id) {
    $.ajax({
        url: 'api/crud.php?skills=' + skills + '&id=' + id,
        method: 'PATCH'
    }).done(data => {
        if (data) {
            $('.addSkills').val("")
            getData()
        }
    })
}
// END CRUD FUNCTION==================================================================