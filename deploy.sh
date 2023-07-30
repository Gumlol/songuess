echo "Switching to branch main"
git checkout main

echo "Deplaying files to server..."
scp -r build/* www@90.156.209.29:/var/www/90.156.209.29/

echo "Done!"