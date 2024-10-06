const fetch = require('node-fetch')
const fs = require('fs')
const minimist = require('minimist')
const dotenv = require('dotenv')

dotenv.config()

async function fetchAllPages() {
  const args = minimist(process.argv.slice(2))
  const blockHeight = args._[0]
  let address = args._[1]
  address = address.replace(/['"]+/g, "")
  const apiUrl = `https://api.covalenthq.com/v1/1/tokens/${address}/token_holders/`
  const apiKey = process.env.API_KEY
  let page = 0
  const pageSize = 100
  let hasMore = true
  const holders = []

  console.log('Starting search...')
  while (hasMore) {
    try {
      const response = await fetch(`${apiUrl}?block-height=${blockHeight}&page-size=${pageSize}&page-number=${page}&key=${apiKey}`)
      const data = await response.json()
      if (data.error) {
        console.error(`Error ocurred while query running: ${data.error_message}`)
        break
      }
      console.log(`Formatting chunk: ${page}`)
      holders.push(...data.data.items)
      hasMore = data.data.pagination.has_more
      page++
    } catch (error) {
      console.error(`Error ocurred while query running: ${error}`)
      break
    }
  }

  return holders;
}

function exportToCsv(holders) {
  const csvHeaders = 'Address,Balance\n'
  let csvContent = csvHeaders
  holders.forEach((holder, index) => {
    console.log(`Pushing info: ${index + 1}`)
    csvContent += `${holder.address},${holder.balance}\n`
  })
  fs.writeFileSync('holders.csv', csvContent)
  console.log('Token holders successfully added to: holders.csv')
}

async function main() {
  const holders = await fetchAllPages()
  exportToCsv(holders)
}

main()
