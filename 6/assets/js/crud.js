function dataTemplate(data) {
    let row = "";
    const listsPrg = $('.listsPrg')

    if (data !== null) {

        for (const key in data) {
            row +=
                `
            <div class="row mb-4">
                <div class="col-12 col-md-6">
                    <div class="prgName"><h4 style="font-weight:bold">${data[key].name}</h4></div>
                    <div class="divide"></div>
                    <div class="prgSkill py-2"><span>${(data[key].skills[0] !== null) ? data[key].skills.join(", ") : ""}</span></div>
                </div>
                <div class="col-12 col-md-6">
                    <form action="javascript:void(0)">
                        <div class="input-group mb-3">
                            <input type="text" class="form-control" placeholder="Tambah Skills" id=newSkills${key} "Tambah Skill...">
                            <div class="input-group-append">
                                <input type="submit" class="btn btn-outline-primary addSkills" id="skills${key}" value="Tambah">
                                <button class="btn btn-outline-danger deletePrg" type="button" id="delete${key}">Hapus</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
                    `
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
    }).done(data => {
        dataTemplate(data)
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
            $('#newSkills').val("")
            getData()
        }
    })
}
// END CRUD FUNCTION==================================================================