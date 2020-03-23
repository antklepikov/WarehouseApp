
namespace :app do

  desc 'create new JS Routes'
  task update: :environment do
    JsRoutes.generate!("app/webpack/routes.js")
  end
end
