## Use node 12.xx .
```bash
# Switch node version
nvm use 12.13.1

# confirm
node --version
```

## Install serverless module
```bash
# Install serverless
npm install -g serverless

# if, Error: EACCES: permission denied, access
sudo npm install -g serverless

# Confirm installment
serverless --version
```

## Deploy backend to AWS using serverless
```bash
serverless deploy --verbose --aws-profile serverless
```