import React from 'react'
import GetEstbilshassetsFinince from './EstbilshStatsitic/GetEstbilshassetsFinince'
import GetestbilshassetsKindchart from './EstbilshStatsitic/GetestbilshassetsKindchart'
import EstbilshLocationtypeschart from './EstbilshStatsitic/EstbilshLocationtypeschart'

const Estbsilshstaticts = ({id}) => {
  return (
    <div>
        <GetEstbilshassetsFinince id={id}/>
        <GetestbilshassetsKindchart  id={id}/>
        <EstbilshLocationtypeschart id={id} />
    </div>
  )
}

export default Estbsilshstaticts