package factory

import (
	"github.com/eddcp/full-cycle/bonus/codepix-project/application/usecase"
	"github.com/eddcp/full-cycle/bonus/codepix-project/infrastructure/repository"
	"github.com/jinzhu/gorm"
)


func TransactionUseCaseFactory(database *gorm.DB) usecase.TransactionUseCase {
	pixRepository := repository.PixKeyRepositoryDb{Db: database}
	transactionRepository := repository.TransactionRepositoryDb{Db: database}

	transactionUseCase := usecase.TransactionUseCase{
		TransactionRepository: &transactionRepository,
		PixRepository:         pixRepository,
	}

	return transactionUseCase
}
