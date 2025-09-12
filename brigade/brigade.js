// brigade/brigade.js

const { events, Job, Group } = require("brigadier");

const registry = "docker.io/yourdockeruser";
const apiImage = `${registry}/smackapi`;

// event handler for push to main/master
events.on("push", async (event, project) => {
  const commit = event.revision.commit.substr(0, 7);

  // build job
  const build = new Job("build-api", "docker:24-dind");
  build.tasks = [
    `docker login -u $DOCKERHUB_USER -p $DOCKERHUB_PASS`,
    `cd smackapi`,
    `docker build -t ${apiImage}:${commit} .`,
    `docker push ${apiImage}:${commit}`,
  ];

  // deploy job
  const deploy = new Job("deploy-api", "bitnami/kubectl:latest");
  deploy.imagePullSecrets = ["dockerhub-secret"];
  deploy.tasks = [
    `kubectl set image deployment/smackapi-api api=${apiImage}:${commit} -n microsmack`,
    `kubectl rollout status deployment/smackapi-api -n microsmack`,
  ];

  await Group.runAll([build, deploy]);
});
