##
## EPITECH PROJECT, 2022
## Makefile
## File description:
## Makefile
##

SRC			=	strlen.asm				\
				strchr.asm				\
				strrchr.asm				\
				memset.asm				\
				memcpy.asm				\
				strcmp.asm				\
				strncmp.asm				\
				memmove.asm				\
				strcasecmp.asm

TEST_SRC	=	tests/test_strlen.c		\
				tests/test_strchr.c		\
				tests/test_strrchr.c	\
				tests/test_memset.c		\
				tests/test_memcpy.c		\
				tests/test_strcmp.c		\
				tests/test_strncmp.c	\
				tests/test_memmove.c	\
				tests/test_strcasecmp.c

DIR			=	src/

OBJ			= $(addprefix $(DIR), $(SRC:.asm=.o))

NAME		= libasm.so

CC			= ld
CFLAGS		= -fPIC -shared
ASFLAGS		= -f elf64

all: $(NAME)

$(NAME): $(OBJ)
	$(CC) $(CFLAGS) -o $(NAME) $(OBJ)

%.o: %.asm
	nasm $(ASFLAGS) -o $@ $<

clean:
	rm -rf $(OBJ)
	rm -rf *.gcno
	rm -rf *.gcda

fclean: clean
	rm -rf $(NAME)

re:	fclean all

unit_tests:	re
	gcc -ldl -o test $(TEST_SRC) -lcriterion --coverage

tests_run:	unit_tests
	./test
	rm -rf test
	rm -rf *.gcno *.gcda
	rm -rf $(OBJ)

.PHONY: $(NAME) all clean fclean re unit_tests tests_run