import { create } from "ipfs-http-client";

const projectId = "2EOigaDUzluN8rQSDF6YUJsRU0i";
const projectSecret = "95b08157475eada50c771e22bbf23173";
const authorization = "Basic " + btoa(projectId + ":" + projectSecret);

const ipfs = create({
  url: "https://ipfs.infura.io:5001/api/v0",
  headers: {
    authorization,
  },
});

export default ipfs;
