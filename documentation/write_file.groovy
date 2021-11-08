import groovy.json.JsonSlurper
import groogy.json.JsonOutput

def jsonSluper = new JsonSlurper()
def list = jsonSluper.parseText(fridge_items)

switch(method) {
  case 'POST':
    def newItem = jsonSluper.parseText(body)
    list.add(newItem)
  break
  case 'PUT':
    def newItem = jsonSluper.parseText(body)
    list.removeIf { it.id == newItem.id }
    list.add(newItem)
  break
  case 'DELETE':
    list.removeIf { it.id == id }
  break
}

def newList = JsonOutput.toJson(list);
def prettyList = JsonOutput.prettyPrint(newList)

filename = 'fridge.json'
File file = new File(filename)
file.write(prettyList)
