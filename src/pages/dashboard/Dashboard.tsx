import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@hooks/useAuth'
import { Badge } from '@components/shared/Badge/Badge'
import { Card } from '@components/shared/Card/Card'
import '@styles/cronica-design-system.css'
import toast from 'react-hot-toast'

interface Character {
  id: string
  name: string
  class: string
  level: number
  experience: number
  status: 'online' | 'offline'
  lastPlayedAt?: string
}

interface DashboardStats {
  totalCharacters: number
  totalAchievements: number
  totalPlaytime: number
}

/**
 * 🎮 Dashboard - Página Principal
 * Visão geral de personagens e estatísticas
 */
export default function Dashboard() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const [characters, setCharacters] = useState<Character[]>()
  const [stats, setStats] = useState<DashboardStats>()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // TODO: Buscar dados do backend
    // GET /api/characters
    // GET /api/characters/stats

    // Dados mockados para demonstração
    const mockCharacters: Character[] = [
      {
        id: '1',
        name: 'Arthas',
        class: 'Cavaleiro',
        level: 15,
        experience: 4500,
        status: 'online',
        lastPlayedAt: '2 horas atrás',
      },
      {
        id: '2',
        name: 'Lúna',
        class: 'Maga',
        level: 12,
        experience: 3200,
        status: 'offline',
        lastPlayedAt: '1 dia atrás',
      },
      {
        id: '3',
        name: 'Ragnar',
        class: 'Guerreiro',
        level: 18,
        experience: 6700,
        status: 'offline',
        lastPlayedAt: '3 dias atrás',
      },
    ]

    const mockStats: DashboardStats = {
      totalCharacters: mockCharacters.length,
      totalAchievements: 24,
      totalPlaytime: 127,
    }

    setCharacters(mockCharacters)
    setStats(mockStats)
    setIsLoading(false)
  }, [])

  const handleCreateCharacter = () => {
    navigate('/character/create')
  }

  const handleSelectCharacter = (characterId: string) => {
    navigate(`/character/${characterId}`)
  }

  const handleLogout = async () => {
    await logout()
    toast.success('Desconectado com sucesso!')
  }

  if (isLoading) {
    return (
      <div className="flex flex--center" style={{ minHeight: '100vh' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '32px', marginBottom: '16px' }}>⚔️</div>
          <p>Carregando...</p>
        </div>
      </div>
    )
  }

  return (
    <div style={{ backgroundColor: 'var(--dark-bg-primary)', minHeight: '100vh' }}>
      {/* Header */}
      <header
        style={{
          borderBottom: '1px solid var(--border-light)',
          padding: 'var(--space-4)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div>
          <h1 style={{ margin: 0, marginBottom: '4px', fontSize: '24px' }}>
            ⚔️ Crônicas
          </h1>
          <p
            style={{
              margin: 0,
              color: 'var(--text-secondary)',
              fontSize: '14px',
            }}
          >
            Bem-vindo, {user?.email}!
          </p>
        </div>
        <button className="btn btn-secondary" onClick={handleLogout}>
          Sair
        </button>
      </header>

      {/* Main Content */}
      <main style={{ padding: 'var(--space-8)', maxWidth: '1400px', margin: '0 auto' }}>
        {/* Estatísticas */}
        <section style={{ marginBottom: 'var(--space-8)' }}>
          <div className="grid grid--cols-3">
            {/* Card: Personagens */}
            <Card title="👥 Personagens" variant="accent">
              <div style={{ fontSize: '32px', fontWeight: 'bold', color: 'var(--cronica-blue-light)' }}>
                {stats?.totalCharacters || 0}
              </div>
              <p style={{ color: 'var(--text-secondary)', margin: 'var(--space-2) 0 0 0' }}>
                Personagens criados
              </p>
            </Card>

            {/* Card: Conquistas */}
            <Card title="🏆 Conquistas" variant="accent">
              <div style={{ fontSize: '32px', fontWeight: 'bold', color: 'var(--cronica-yellow)' }}>
                {stats?.totalAchievements || 0}
              </div>
              <p style={{ color: 'var(--text-secondary)', margin: 'var(--space-2) 0 0 0' }}>
                Desbloqueadas e prontas
              </p>
            </Card>

            {/* Card: Tempo de Jogo */}
            <Card title="⏱️ Tempo de Jogo">
              <div style={{ fontSize: '32px', fontWeight: 'bold', color: 'var(--cronica-orange)' }}>
                {stats?.totalPlaytime || 0}h
              </div>
              <p style={{ color: 'var(--text-secondary)', margin: 'var(--space-2) 0 0 0' }}>
                Total acumulado
              </p>
            </Card>
          </div>
        </section>

        {/* Divisor */}
        <hr style={{ borderColor: 'var(--border-light)', margin: 'var(--space-8) 0' }} />

        {/* Personagens */}
        <section>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 'var(--space-6)',
            }}
          >
            <h2 style={{ margin: 0 }}>🎭 Meus Personagens</h2>
            <button className="btn btn-primary" onClick={handleCreateCharacter}>
              ➕ Novo Personagem
            </button>
          </div>

          {characters && characters.length > 0 ? (
            <div className="grid grid--cols-3">
              {characters.map(char => (
                <Card
                  key={char.id}
                  variant="default"
                  onClick={() => handleSelectCharacter(char.id)}
                  footer={
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={e => {
                        e.stopPropagation()
                        handleSelectCharacter(char.id)
                      }}
                    >
                      Abrir Ficha
                    </button>
                  }
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-3)' }}>
                    <div>
                      <h3 style={{ margin: 0, marginBottom: '4px' }}>{char.name}</h3>
                      <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '12px' }}>
                        {char.class}
                      </p>
                    </div>
                    <Badge variant={char.status === 'online' ? 'success' : 'info'}>
                      {char.status === 'online' ? '🟢 Online' : '⚫ Offline'}
                    </Badge>
                  </div>

                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: 'var(--space-2)',
                    }}
                  >
                    <div>
                      <p style={{ margin: 0, color: 'var(--text-tertiary)', fontSize: '11px' }}>
                        NÍVEL
                      </p>
                      <p style={{ margin: 0, fontSize: '20px', fontWeight: 'bold', color: 'var(--cronica-blue-light)' }}>
                        {char.level}
                      </p>
                    </div>
                    <div>
                      <p style={{ margin: 0, color: 'var(--text-tertiary)', fontSize: '11px' }}>
                        XP
                      </p>
                      <p style={{ margin: 0, fontSize: '14px', color: 'var(--cronica-yellow)' }}>
                        {char.experience.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {char.lastPlayedAt && (
                    <p style={{ margin: 'var(--space-3) 0 0 0', color: 'var(--text-tertiary)', fontSize: '12px' }}>
                      📅 {char.lastPlayedAt}
                    </p>
                  )}
                </Card>
              ))}
            </div>
          ) : (
            <Card variant="accent">
              <div style={{ textAlign: 'center', padding: 'var(--space-8)' }}>
                <p style={{ fontSize: '24px', marginBottom: 'var(--space-2)' }}>🚀</p>
                <h3 style={{ margin: 0, marginBottom: 'var(--space-2)' }}>Nenhum personagem criado</h3>
                <p style={{ color: 'var(--text-secondary)' }}>
                  Crie seu primeiro personagem para começar a jornada!
                </p>
              </div>
            </Card>
          )}
        </section>
      </main>
    </div>
  )
}
