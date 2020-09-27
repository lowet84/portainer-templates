import * as express from 'express'
import {TemplateCollection} from './template'
import { App } from './app'
import {readFileSync} from 'fs'

const app = express()

const apps: App[] = JSON.parse(readFileSync('./src/apps.json','utf8'))

const getTemplates = (domain: string): TemplateCollection => {
  return {
      version: '2',
      templates:  apps.map(app=>({
      "type": 1,
      "title": app.name,
      "name": app.name.toLowerCase(),
      "description": app.description,
      "categories": app.categories,
      "platform": "linux",
      "logo": app.logo,
      "image": app.image,
      "network": "pi",
      "volumes": [
          {
              "container": app.storage,
              "bind": `/volumes/${app.name.toLowerCase()}`
          }
      ],
      "labels": [
          {
              "name": `traefik.http.routers.${app.name.toLowerCase()}.rule`,
              "value": `Host(\`${app.name.toLowerCase()}.pi.com\`)`
          },
          {
              "name": `traefik.http.services.${app.name.toLowerCase()}.loadbalancer.server.port`,
              "value": `${app.port}`
          },
          {
              "name": "traefik.enable",
              "value": "true"
          }
      ]
  }))}
}

app.use('/:domain', (req, res) => {
  res.send(getTemplates(req.params.domain))
})

app.listen(3000)
