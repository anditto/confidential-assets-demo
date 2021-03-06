
function init() {
    $("#order").click(order);
    $("#reset").click(reset);
    $("#qrcode").click(copyUri);
}

function order() {
    $("#qrcode").empty();
    $("#addr").empty();
    $("#price").empty();
    $("#asset").empty();
    $("#uri").val("");
    var param = {
        item: "Caramel Macchiato Coffee"
    };
    $.getJSON("/order", param)
        .done(function (data) {
            if (data.result) {
                console.log(data.uri);
                let item = {
                    text: data.uri
                };
                $("#qrcode").qrcode(item);
                $("#name").text(data.name);
                $("#addr").text(data.addr);
                $("#asset").text(data.asset);
                $("#price").text("" + data.price);
                $("#uri").val(data.uri);
            }
            $("#before").fadeOut('slow', function () { $("#after").fadeIn('slow'); });
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            alert("order fail\n" + JSON.stringify(jqXHR) + "\n" + textStatus + "\n" + errorThrown + "\n");
        });
}

function reset() {
    if (confirm("Return to order page?")) {
        $("#after").fadeOut('slow', function () { $("#before").fadeIn('slow'); });
    }
}

function copyUri() {
    document.getElementById("uri").select();
    document.execCommand("copy");
    alert("Data in clipboard; paste this into the customer interface");
}

$(init);
