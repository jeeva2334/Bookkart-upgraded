#First stage of prod build

FROM ubuntu:latest

RUN apt-get update
RUN sudo apt install -y curl
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
RUN sudo apt-get install -y nodejs
RUN sudo apt-get install -y build-essential
RUN sudo apt-get install -y git
RUN sudo apt-get clean
RUN node -v
RUN git clone https://github.com/sanjay2334/Bookkart-upgraded.git 
WORKDIR /Bookkart-upgraded
RUN mkdir /app
RUN cp -r /Bookkart-upgraded/* /app
WORKDIR /app
RUN npm install
RUN npm run build

#Second stage of prod build

FROM nginx:1.17.8-alpine
COPY --from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]