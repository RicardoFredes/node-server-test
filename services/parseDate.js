const mounth = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro']

const parseDate = date => {
  const d = date.split('T')[0].split('-')
  return `${d[2]} de ${mounth[Math.round(d[1]) - 1]} de ${d[0]}`
}

module.exports = parseDate