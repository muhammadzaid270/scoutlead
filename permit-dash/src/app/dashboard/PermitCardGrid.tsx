import PermitCard from './PermitCard'
import { type Permit } from './permitUtils'

type PermitCardGridProps = {
  permits: Permit[] | null
}

const PermitCardGrid = ({ permits }: PermitCardGridProps) => {
  if (!permits || permits.length === 0) {
    return null
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {permits.map((permit, index) => (
          <PermitCard key={permit.permit_id} permit={permit} index={index} />
        ))}
      </div>
    </>
  )
}

export default PermitCardGrid
