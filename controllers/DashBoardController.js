export function GetIndex(req, res, next) {
  res.render("dashboard/index", { "page-title": "Dashboard" });
}