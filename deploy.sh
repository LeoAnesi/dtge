cd frontend
yarn && REACT_APP_ENV=production yarn build

cd ../backend
yarn && yarn build

cd ..

heroku container:login

heroku container:push --app dtge web

heroku container:release --app dtge web
