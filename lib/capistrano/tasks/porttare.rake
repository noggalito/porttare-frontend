namespace :porttare do
  desc 'build app'
  task :build do
    on roles(:app) do
      # execute 'NODE_ENV=demo ./node_modules/grunt-cli/bin/grunt compress'
      npm_path = fetch(:npm_target_path, release_path)
      within npm_path do
        with node_env: fetch(:stage), path: fetch(:nvm_node_path).map{|d| "#{d}/bin"}.join(":") do
          SSHKit.config.command_map[:grunt] = "./node_modules/grunt-cli/bin/grunt"
          execute :grunt, :compress
        end
      end
    end
  end
end
