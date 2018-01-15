window.onload = function () {
  $(function () {
    var availableTags = [
      "IFI1234.DT Subject 1234",
      "IFI4567.DT Subject 4567"
    ];
    $("#tags").autocomplete({
      source: availableTags
    });
  });
}