const AWS = require('aws-sdk')
const jmespath = require('jmespath')
const region = 'us-west-2'

const meta = {
    columns: [
        {
            name: 'Id',
            selector: 'InstanceId'
        },
        {
            name: 'Availability Zone',
            selector: 'AvailabilityZone'
        },
        {
            name: 'State',
            selector: 'InstanceState.Name'
        }
    ]
}

const composite_selector = meta.columns.map(i => i['selector']).join(',')

export async function get(req, res, next) {
    const ec2 = new AWS.EC2({ region })
    ec2.describeInstanceStatus({}, function(err, data) {
        res.setHeader('Content-Type', 'application/json')
        if (err) {
            res.end(JSON.stringify(err))
        } else {
            const selected_data = jmespath.search(data, `InstanceStatuses[].[${composite_selector}]`)
            res.end(JSON.stringify({
                'data': selected_data,
                'meta': meta
            }))
        }
    })
}