/*
** EPITECH PROJECT, 2022
** test
** File description:
** test
*/

#include <criterion/criterion.h>
#include <criterion/redirect.h>
#include <dlfcn.h>
#include <string.h>

Test(memmove_hello_2, succeed)
{
    char *str = malloc(sizeof(char) * 5 + 1);

    void *shared_lib = dlopen("./libasm.so", RTLD_LAZY);
    char *(*my_memmove)(void *, const void *, size_t);
    *(void **)(&my_memmove) = dlsym(shared_lib, "memmove");
    strcpy(str, "hello");
    cr_expect_str_eq(my_memmove(str, "coucou", 2), "collo");
    free(str);
    dlclose(shared_lib);
}

Test(memmove_hello_0, succeed)
{
    char *str = malloc(sizeof(char) * 5 + 1);

    void *shared_lib = dlopen("./libasm.so", RTLD_LAZY);
    char *(*my_memmove)(void *, const void *, size_t);
    *(void **)(&my_memmove) = dlsym(shared_lib, "memmove");
    strcpy(str, "hello");
    cr_expect_str_eq(my_memmove(str, "coucou", 0), "hello");
    free(str);
    dlclose(shared_lib);
}

Test(memmove_hello_8, succeed)
{
    char *str = malloc(sizeof(char) * 5 + 1);

    void *shared_lib = dlopen("./libasm.so", RTLD_LAZY);
    char *(*my_memmove)(void *, const void *, size_t);
    *(void **)(&my_memmove) = dlsym(shared_lib, "memmove");
    strcpy(str, "hello");
    cr_expect_str_eq(my_memmove(str, "coucou", 8), "coucou");
    free(str);
    dlclose(shared_lib);
}

Test(memmove_null_2, succeed)
{
    char *str = malloc(sizeof(char) * 5 + 1);

    void *shared_lib = dlopen("./libasm.so", RTLD_LAZY);
    char *(*my_memmove)(void *, const void *, size_t);
    *(void **)(&my_memmove) = dlsym(shared_lib, "memmove");
    cr_expect_str_eq(my_memmove(str, "coucou", 2), "co");
    dlclose(shared_lib);
}