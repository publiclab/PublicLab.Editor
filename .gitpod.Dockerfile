FROM gitpod/workspace-full
                    
USER gitpod

RUN bash -c ". ~/.nvm/nvm-lazy.sh && npm install -g gulp-cli live-server"
