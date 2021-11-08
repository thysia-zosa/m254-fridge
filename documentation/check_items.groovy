import groovy.json.JsonSlurper
import groogy.json.JsonOutput

def jsonSluper = new JsonSlurper()
def list = jsonSluper.parseText(fridge_items)
def today = new Date()

def warnList = []

list.each { entry ->
  def date = Date.parse('yyyy-MM-dd', entry.date)
  if (date.minus(today) < 2) {
warnList.add(entry)
  }
}

def newList = JsonOutput.toJson(warnList);
def prettyList = JsonOutput.prettyPrint(newList)

