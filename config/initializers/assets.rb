# Be sure to restart your server when you modify this file.
#bundle exec rake assets:precompile

# Version of your assets, change this if you want to expire all your assets.
Rails.application.config.assets.version = '1.0'

# Add additional assets to the asset load path.
# Rails.application.config.assets.paths << Emoji.images_path
# Add Yarn node_modules folder to the asset load path.
Rails.application.config.assets.paths << Rails.root.join('node_modules')
# Precompile additional assets.
# application.js, application.css, and all non-JS/CSS in the app/assets
# folder are already added.
# Rails.application.config.assets.precompile += %w( admin.js admin.css )

# JQuery
Rails.application.config.assets.precompile += %w( jquery-3.3.1.js )

# ROSLIB
Rails.application.config.assets.precompile += %w( roslib.js )

# Map display script for first page of site
Rails.application.config.assets.precompile += %w( map_simplified.js )

# Javascript for "new" view
Rails.application.config.assets.precompile += %w( new.js )

# CSS
Rails.application.config.assets.precompile += %w( trips.css tamuber.css )

#Javascript for "specify" view
Rails.application.config.assets.precompile += %w( specify.js )

#Javascript for "pickup" view
Rails.application.config.assets.precompile += %w( pickup.js )

#Javascript for "transit" view
Rails.application.config.assets.precompile += %w( transit.js )
# Edit Manish start
#Javascript for "login and signup" view
Rails.application.config.assets.precompile += %w( sessions.css users.css )
# Edit Manish end
#Javascript for "end" view
Rails.application.config.assets.precompile += %w( end.js )
